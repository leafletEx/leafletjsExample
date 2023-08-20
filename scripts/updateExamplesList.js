import { join, resolve } from 'node:path';
import chalk from 'chalk';
import fs from 'fs-extra';
import { consola } from 'consola';
import { __dirname, DIR_SRC } from './utils.js';

// 获取所有示例目录
export async function getAllExamples() {
  let allExamplesList = [];

  const dirPath = resolve(__dirname, '../src/examples');

  try {
    // 获取文件夹内文件
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const stats = await fs.stat(join(dirPath, file));

      // 判断是否是文件夹
      if (stats.isDirectory()) {
        // 生成示例文件夹信息
        allExamplesList.push({
          name: file,
          size: stats.size,
          lastUpdated: stats.mtimeMs,
          path: `./src/examples/${file}`
        });
      }
    }

    return allExamplesList;
  } catch (error) {
    consola.error('Error:', '获取所有项目示例错误');
    return [];
  }
}

export async function generateExamplesJson() {
  consola.info('开始获取项目所有示例...');

  const allExamplesList = await getAllExamples();

  await fs.writeFile(
    join(DIR_SRC, './examplesList.json'),
    `${JSON.stringify(allExamplesList, null, 2)}\n`,
    'utf8'
  );

  consola.success(chalk.green('生成项目示例 json 文件成功'));
}
