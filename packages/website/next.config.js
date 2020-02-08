const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism],
    hastPlugins: [rehypePrism], // <-----------  now effect
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
  exportPathMap: async function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      ...defaultPathMap,
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'hello- i am from query' } },
    };
  },

  // assetPrefix: '/ipns/Qmd3HzpnpSsLeUQF2mJEXn24a1yYo2LTaQyoq4mwxkse1Z/',
});
