var path = require('path');
var GulpConfig = require('az-gulp-env-lite').GulpConfig;

var projRoot  = path.resolve(__dirname, '..');
var config = {
  projRoot: projRoot,
  base: projRoot,
  submodules: {
    commonLibrary: {
      prefix: 'common',
      entry: {
        dir: 'src/common',
        js: {
          glob: '**/*.js',
        },
      },
      output: {
        default: {
          js: {},
        },
      },
    },
    server: {
      prefix: 'server',
      useCommonLibrary: {
        relativePath: 'common'
      },
      reloadDelay: 1500,
      entry: {
        dir: 'src/server',
        js: {
          glob: '**/*.js',
        },
      },
      output: {
        default: {
          dir: 'dist/server',
          js: {
            filename: 'index.js',
          },
        },
        //dev: {},
        //dist: {},
      },
    },
    frontEnd: {
      prefix: 'frontEnd',
      useCommonLibrary: {
        relativePath: 'common'
      },
      entry: {
        js: {
          dir: 'src/front-end',
          glob: '**/*.js',
          filename: 'app.js',
        },
        static: {
          dir: 'public',
          filename: '**/*.*',
        },
      },
      output: {
        dir: 'dist',
        default: {
          dir: 'front-end',
        },
        //dev: {},
        //dist: {},
      },
    },
  },
};

module.exports = new GulpConfig(config);
