import { runner } from 'hygen';
import path from 'path';
import fs from 'fs';

const Logger = require('hygen/lib/logger');

const defaultTemplates = path.join(__dirname, '_templates');

async function genAggregation() {
  const timelines = await fs.promises.readdir(`${__dirname}/../xxxx/timeline`);

  const posts = await fs.promises.readdir(`${__dirname}/../xxx/pages/posts`);

  runner(['vvfox', 'agg'], {
    templates: defaultTemplates,
    cwd: process.cwd(),
    createPrompter: () => require('enquirer'),
    logger: new Logger(console.log.bind(console)),
    // exec: (action, body) => {
    //   const opts = {};
    //   return require('execa').shell(action, opts);
    // },
    helpers: {
      timelines,
      posts: posts.filter(e => !e.startsWith('index.')),
    },
  });
}

async function main() {
  await genAggregation();
}

main();
