import { join } from 'node:path';
import md5 from 'md5';
import Git from 'simple-git';
import fs from 'fs-extra';
import { consola } from 'consola';
import { DIR_SRC } from './utils.js';

const git = Git({
  maxConcurrentProcesses: 200
});

export async function getContributorsAt(path) {
  try {
    const list = (
      await git.raw(['log', '--pretty=format:"%an|%ae"', '--', path])
    )
      .split('\n')
      .map((i) => i.slice(1, -1).split('|'));
    const map = {};

    list
      .filter((i) => i[1])
      .forEach((i) => {
        if (!map[i[1]]) {
          map[i[1]] = {
            name: i[0],
            count: 0,
            hash: md5(i[1])
          };
        }
        map[i[1]].count++;
      });

    return Object.values(map).sort((a, b) => b.count - a.count);
  } catch (e) {
    console.error(e);
    return [];
  }
}

// 获取组件贡献者
export async function getComponentContributor() {
  consola.info('开始获取组件贡献者--------------------');
  const examplesList = await import('./examplesList.json', {
    assert: { type: 'json' }
  }).then((res) => res.default);

  const result = await Promise.all(
    examplesList.map(async (i) => {
      return [i.name, await getContributorsAt(i.path)];
    })
  );

  await fs.writeFile(
    join(DIR_SRC, './componentContributor.json'),
    `${JSON.stringify(Object.fromEntries(result), null, 2)}\n`,
    'utf8'
  );

  consola.success('获取组件贡献者完成--------------------');
}
