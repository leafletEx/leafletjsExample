import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import process from 'node:process';
import { consola } from 'consola';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const DIR_SRC = resolve(__dirname, './');

// 获取 github 用户头像根据名称
export function getAvatarUrl(name) {
  return `https://github.com/${name}.png`;
}

// 发生错误退出并打印日志
export function errorAndExit(err) {
  consola.error(err);
  process.exit(1);
}
