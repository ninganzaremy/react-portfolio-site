const Sitemap = require('react-router-sitemap').default;
const path = require('path');

const { routesConfig } = require('./routeConfig.js');
const sitemapOutputPath = path.join(
  __dirname,
  '..',
  '..',
  'public',
  'sitemap.xml',
);

const sitemap = new Sitemap(routesConfig)
  .build('https://ninganzaremy.com/')
  .save(sitemapOutputPath);
