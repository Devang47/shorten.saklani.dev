import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    postcss: true,
  }),

  prerender: {
    enabled: true
  },

  kit: {
    adapter: adapter({
      // default options are shown
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false
    }),
    prerender: {
      default: true
    },
    vite: {
      resolve: {
        alias: {
          $stores: path.resolve('./src/stores'),
          $styles: path.resolve('./src/styles'),
          $utils: path.resolve('./src/utils'),
          $components: path.resolve('./src/lib/components'),
          $pages: path.resolve('./src/lib/pages'),
          $sections: path.resolve('./src/lib/sections'),
          $icons: path.resolve('./src/lib/icons'),
        },
      },
    },
  },
};

export default config;
