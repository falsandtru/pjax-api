const gulp = require('gulp');
const shell = cmd => require('child_process').execSync(cmd, { stdio: [0, 1, 2] });
const del = require('del');
const extend = require('extend');
const seq = require('run-sequence');
const $ = require('gulp-load-plugins')();
const Server = require('karma').Server;

const pkg = require('./package.json');
const config = {
  browsers: ['Chrome', 'Firefox'].concat((os => {
    switch (os) {
      case 'Windows_NT':
        return ['Edge'];
      case 'Darwin':
        return [];
     default:
        return [];
    }
  })(require('os').type())),
  ts: {
    options: extend(require('./tsconfig.json').compilerOptions, {
      typescript: require('typescript'),
      outFile: `${pkg.name}.js`
    }),
    dist: {
      src: [
        '*.ts'
      ],
      dest: 'dist'
    },
    test: {
      src: [
        '*.ts',
        'src/**/*.ts',
        'test/**/*.ts'
      ],
      dest: 'dist'
    }
  },
  banner: [
    `/*! ${pkg.name} v${pkg.version} ${pkg.repository.url} | (c) 2016, ${pkg.author} | ${pkg.license} License */`,
    ''
  ].join('\n'),
  exporter:
`define = typeof define === 'function' && define.amd
  ? define
  : (function () {
    'use strict';
    var name = '${pkg.name}',
        workspace = {};
    return function define(m, rs, f) {
      return !f
        ? void define(name, m, rs)
        : void f.apply(this, rs.map(function (r) {
          switch (r) {
            case 'require': {
              return typeof require === 'function' ? require : void 0;
            }
            case 'exports': {
              return m.indexOf('/') === -1
                ? workspace[m] = typeof exports === 'undefined' ? self[m] = self[m] || {} : exports
                : workspace[m] = workspace.hasOwnProperty(m) ? workspace[m] : {};
            }
            default: {
              return r.slice(-2) === '.d' && {}
                  || workspace.hasOwnProperty(r) && workspace[r]
                  || typeof require === 'function' && require(r)
                  || self[r];
            }
          }
        }));
    };
  })();
`,
  clean: {
    dist: 'dist'
  }
};

gulp.task('ts:watch', function () {
  gulp.watch(config.ts.test.src, ['ts:test']);
});

gulp.task('ts:test', function () {
  return gulp.src(config.ts.test.src)
    .pipe($.typescript(config.ts.options))
    .pipe($.header(config.exporter))
    .pipe(gulp.dest(config.ts.test.dest));
});

gulp.task('ts:dist', function () {
  return gulp.src(config.ts.dist.src)
    .pipe($.typescript(config.ts.options))
    .once("error", function () {
      this.once("finish", () => process.exit(1));
    })
    .pipe($.unassert())
    .pipe($.header(config.exporter))
    .pipe($.header(config.banner))
    .pipe(gulp.dest(config.ts.dist.dest))
    .pipe($.uglify({ preserveComments: 'license' }))
    .pipe($.rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.ts.dist.dest));
});

gulp.task('karma:watch', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: config.browsers,
    preprocessors: {
      'dist/*.js': ['espower']
    },
  }, done).start();
});

gulp.task('karma:test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: config.browsers,
    reporters: ['dots', 'coverage'],
    preprocessors: {
      'dist/*.js': ['coverage', 'espower']
    },
    singleRun: true
  }, done).start();
});

gulp.task('karma:ci', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: config.browsers,
    reporters: ['dots', 'coverage', 'coveralls'],
    preprocessors: {
      'dist/*.js': ['coverage', 'espower']
    },
    singleRun: true
  }, done).start();
});

gulp.task('clean', function () {
  return del([config.clean.dist]);
});

gulp.task('install', function () {
  shell('npm i');
});

gulp.task('update', function () {
  shell('bundle update');
  shell('ncu -ua');
  shell('npm i');
});

gulp.task('watch', ['clean'], function () {
  seq(
    'ts:test',
    [
      'ts:watch',
      'karma:watch'
    ]
  );
});

gulp.task('test', ['clean'], function (done) {
  seq(
    'ts:test',
    'karma:test',
    function () {
      done();
    }
  );
});

gulp.task('view', ['site'], function () {
  shell('bundle exec jekyll serve -s ./gh-pages -d ./gh-pages/_site --incremental');
});

gulp.task('dist', ['clean'], function (done) {
  seq(
    'ts:dist',
    done
  );
});

gulp.task('site', ['dist'], function () {
  return gulp.src([
    'node_modules/spica/dist/spica.js',
    'node_modules/localsocket/dist/localsocket.js',
    'dist/pjax-api.js'
  ])
    .pipe(gulp.dest('./gh-pages/assets/js/lib'));
});

gulp.task('ci', ['clean'], function (done) {
  seq(
    'ts:test',
    'karma:ci',
    'dist',
    function () {
      done();
    }
  );
});
