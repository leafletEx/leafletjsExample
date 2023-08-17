import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const DIR_SRC = resolve(__dirname, './');

// 获取 github 用户头像根据名称
export function getAvatarUrl(name) {
  return `https://github.com/${name}.png`;
}
