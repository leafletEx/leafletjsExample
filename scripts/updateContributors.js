import { join } from 'node:path';
import fs from 'fs-extra';
import { $fetch } from 'ohmyfetch';
import { consola } from 'consola';
import { DIR_SRC } from './utils.js';

async function fetchContributors(page = 1) {
  const additional = ['egoist'];

  const collaborators = [];

  const data =
    (await $fetch(
      `https://api.github.com/repos/vueuse/vueuse/contributors?per_page=100&page=${page}`,
      {
        method: 'get',
        headers: {
          'content-type': 'application/json'
        }
      }
    )) || [];

  collaborators.push(...data.map((i) => i.login));

  if (data.length === 100)
    collaborators.push(...(await fetchContributors(page + 1)));

  return Array.from(
    new Set([
      ...collaborators.filter(
        (collaborator) =>
          !['renovate[bot]', 'dependabot[bot]', 'renovate-bot'].includes(
            collaborator
          )
      ),
      ...additional
    ])
  );
}

// 获取所有贡献值
export async function updateContributors() {
  consola.info('开始获取项目贡献者--------------------');

  const collaborators = await fetchContributors();

  await fs.writeFile(
    join(DIR_SRC, './contributors.json'),
    `${JSON.stringify(collaborators, null, 2)}\n`,
    'utf8'
  );

  consola.success('获取项目贡献者完成--------------------');
}
