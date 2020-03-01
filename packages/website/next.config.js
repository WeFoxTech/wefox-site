const rehypePrism = require('@mapbox/rehype-prism');
const injection = require('./lib/next/mdxInjection');
const withMDX = require('@foxmn/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism],
    beforeCompile: injection.beforeCompile,
    afterCompile: injection.afterCompile,
  },
});

const assetPrefix = process.env['ASSETS_PREFIX'] || '/';
const basePath = process.env['BASE_PATH'] || '';

const exportTrailingSlash = true;
console.log(
  `assetPrefix: [${assetPrefix}]  basePath: [${basePath}]  exportTrailingSlash: [${exportTrailingSlash}] `
);
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'tsx'],
  assetPrefix: assetPrefix,
  basePath: basePath,
  experimental: {
    basePath: basePath,
  },
  exportTrailingSlash,
  env: {
    ASSETS_PREFIX: assetPrefix,
    BASE_PATH: basePath,
    VERSION: process.env.VERSION || '0.1.0',
    BUILD_NUMBER: process.env.BUILD_NUMBER || '1',
    SHA: process.env.SHA || 'c7a880b6ae1825521b0a0ee1686fd7af198b735e',
  },
  _exportPathMap: async function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      ...defaultPathMap,
      '/': { page: '/' },
      '/about': { page: '/about' },
      // '/p/hello-nextjs': { page: '/about', query: { title: 'hello- i am from query' } },
    };
  },
});
