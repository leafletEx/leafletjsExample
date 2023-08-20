import glob from 'fast-glob';
import { Octokit } from 'octokit';
import consola from 'consola';
import chalk from 'chalk';
import { chunk, mapValues, uniqBy } from 'lodash-es';
import fs from 'fs-extra';
import { resolve } from 'node:path';
import { __dirname, errorAndExit } from './utils.js';

const REPO_BRANCH = 'dev';
const REPO_NAME = 'leafletjsExample';
const REPO_OWNER = 'leafletjsExample';

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
  request: {
    fetch: fetch
  }
});

// 获取历史 commit 信息
const fetchCommits = async (options) => {
  const query = `{
    repository(owner: "${REPO_OWNER}", name: "${REPO_NAME}") {
      object(expression: "${REPO_BRANCH}") {
        ... on Commit {
          ${options
            .map(({ path, after }, index) => {
              return `
              path${index}: history(path: "${path}"${
                after ? `, after: "${after}"` : ''
              }) {
                nodes {
                  oid
                  author {
                    avatarUrl
                    date
                    email
                    name
                    user {
                      login
                    }
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }`;
            })
            .join('\n')}
        }
      }
    }
  }`;
  let response = await octokit.graphql(query);
  response = response.repository.object;

  return Object.fromEntries(
    Object.entries(response).map(([key, result]) => {
      const index = +key.replace('path', '');
      return [index, result];
    })
  );
};

// 获取贡献者信息及贡献次数
const calcContributors = (commits = []) => {
  const contributors = {};

  // author commit 提交者信息
  for (const { author } of commits) {
    const login = author.user?.login;
    if (!login) continue;

    if (!contributors[login])
      contributors[login] = {
        login,
        name: author.name,
        email: author.email,
        avatar: author.avatarUrl,
        count: 0
      };

    contributors[login].count++;
  }
  return Object.values(contributors).sort((a, b) => b.count - a.count);
};

// 获取根据组件获取组件贡献者信息
const getContributorsByComponents = async (components = []) => {
  // 获取组件目录及组件相关文件
  let options = components.flatMap((component) => [
    { key: component, path: `src/examples/${component}` }
  ]);

  const commits = {};
  do {
    const results = await fetchCommits(options);

    for (const [i, result] of Object.values(results).entries()) {
      const component = options[i].key;
      if (!commits[component]) commits[component] = [];
      commits[component].push(...result.nodes);
    }

    options = options
      .map((option, index) => {
        const pageInfo = results[index].pageInfo;
        const after = pageInfo.hasNextPage ? pageInfo.endCursor : undefined;
        return { ...option, after };
      })
      .filter((option) => !!option.after);
  } while (options.length > 0);

  // 去重
  return mapValues(commits, (commits) =>
    calcContributors(uniqBy(commits, 'oid'))
  );
};

async function getContributors() {
  if (!process.env.GITHUB_API_TOKEN) {
    consola.info('生成贡献者需要有 GITHUB_API_TOKEN');
    return [];
  }

  // 获取所有示例
  const components = await glob('*', {
    cwd: resolve(__dirname, '../src/examples'),
    onlyDirectories: true
  });

  let contributors = {};
  consola.info('Fetching contributors...');
  for (const chunkComponents of chunk(components, 10)) {
    contributors = {
      ...contributors,
      ...(await getContributorsByComponents(chunkComponents))
    };
    consola.success(
      chalk.green(`Fetched contributors: ${chunkComponents.join(', ')}`)
    );
  }
  return contributors;
}

// 生成组件贡献者 json
export async function generateComponentContributorJson() {
  // 输出文件路径
  const outputFilePath = resolve(__dirname, './componentContributor.json');

  const contributors = await getContributors().catch((err) => {
    errorAndExit(err);
  });

  await fs.writeFile(
    outputFilePath,
    `${JSON.stringify(contributors, null, 2)}\n`,
    'utf8'
  );

  consola.success(chalk.green('组件贡献者获取完毕'));
}
