const fs = require('fs');
const path = require('path');

async function readMdxLib(name) {
  const fpath = path.join(__dirname, '..', 'mdx', name);
  const content = await fs.promises.readFile(fpath, { encoding: 'utf8' });
  return content;
}

const header = async path => {
  if (/\/pages\//.test(path)) {
    return await readMdxLib('pagesHeader.js');
  }
  return '';
};

const footer = async path => {
  if (/\/pages\//.test(path)) {
    return await readMdxLib('pagesFooter.js');
  }
  return '';
};

module.exports = {
  header,
  footer,
};
