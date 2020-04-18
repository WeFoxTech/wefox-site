const fs = require('fs');
const path = require('path');

async function readMdxLib(name) {
  const fpath = path.join(__dirname, '..', 'mdx', name);
  const content = await fs.promises.readFile(fpath, { encoding: 'utf8' });
  return content;
}

const beforeCompile = async (path, content) => {
  if (/\/website\/pages\//.test(path)) {
    const header = await readMdxLib('pagesHeader.js');
    if (/export const meta /.test(content)) {
      return `${header}\nexport default withPost(meta);\n\n${content}`;
    } else {
      // TODO: add detault meta
      return `${header}\nexport default withPost({title: 'wefox'});\n\n${content}`;
    }
    return `${header}\n${content}`;
  }
  return content;
};
const afterCompile = async (path, content) => {
  if (/\/website\/pages\//.test(path)) {
    const footer = await readMdxLib('pagesFooter.js');
    content = content.replace(/export default function MDXContent/, 'export function MDXContent');
    return `${content}\n${footer}`;
  }
  return content;
};

module.exports = {
  beforeCompile,
  afterCompile,
};
