import examplesList from '../../scripts/examplesList.json';

export function replacer(code, value, key, insert) {
  const START = `<!--${key}_STARTS-->`;
  const END = `<!--${key}_ENDS-->`;
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, 'im');

  const target = value ? `${START}\n${value}\n${END}` : `${START}${END}`;

  if (!code.match(regex)) {
    if (insert === 'none') return code;
    else if (insert === 'head') return `${target}\n\n${code}`;
    else return `${code}\n\n${target}`;
  }

  return code.replace(regex, target);
}

const getFooter = (name) => {
  const ContributorsSection = `
## 贡献者

<Contributors fn="${name}" />
`;
  return {
    ContributorsSection
  };
};

export function MarkdownTransform() {
  const examplesNameList = examplesList.map((item) => item.name);

  return {
    name: 'vueuse-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/)) return null;

      const [_pkg, name, i] = id.split('/').slice(-3);

      // 是 examples 下的目录
      if (examplesNameList.includes(name) && i === 'index.md') {
        const { ContributorsSection } = getFooter(name);

        // 插入数据
        code = replacer(code, ContributorsSection, 'FOOTER', 'tail');
      }

      return code;
    }
  };
}
