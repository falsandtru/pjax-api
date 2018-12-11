const gulp = require('gulp');
const { series, parallel } = gulp;
const glob = require('glob');
const shell = cmd => require('child_process').execSync(cmd, { stdio: [0, 1, 2] });
const del = require('del');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const $ = require('gulp-load-plugins')();
const browserify = require('browserify');
const tsify = require('tsify');
const minify = require('gulp-uglify/composer')(require('uglify-es'), console);
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
    `/*! ${pkg.name} v${pkg.version} ${pkg.repository.url} | (c) 2012, ${pkg.author} | ${pkg.license} License */`,
    ''
  ].join('\n'),
  module: `
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      module.exports = factory();
  } else {
      //root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  return require('${pkg.name}');
}));
`,
  clean: [
    'dist',
  ]
};

function compile(src) {
  let done = true;
  const b = browserify(Object.values(src).map(p => glob.sync(p)), {
    cache: {},
    packageCache: {},
  })
    .require(`./index.ts`, { expose: pkg.name })
    .plugin(tsify, { global: true, ...require('./tsconfig.json').compilerOptions })
    .on('update', () => void bundle());
  return bundle();

  function bundle() {
    console.time('bundle');
    return b
      .bundle()
      .on("error", err => done = console.log(err + ''))
      .pipe(source(`${pkg.name}.js`))
      .pipe(buffer())
      .once('finish', () => console.timeEnd('bundle'))
      .once("finish", () => done || process.exit(1))
      .pipe($.footer(config.module));
  }
}

gulp.task('ts:dev', () =>
  gulp.watch(config.ts.test.src, { ignoreInitial: false }, () =>
    compile(config.ts.test.src)
      .pipe($.rename({ extname: '.test.js' }))
      .pipe(gulp.dest(config.ts.test.dest))));

gulp.task('ts:test', () =>
  compile(config.ts.test.src)
    .pipe($.rename({ extname: '.test.js' }))
    .pipe(gulp.dest(config.ts.test.dest)));

gulp.task('ts:dist', () =>
  compile(config.ts.dist.src)
    .pipe($.unassert())
    .pipe($.header(config.banner))
    .pipe(gulp.dest(config.ts.dist.dest))
    .pipe($.rename({ extname: '.min.js' }))
    .pipe(minify({ output: { comments: /^!/ } }))
    .pipe(gulp.dest(config.ts.dist.dest)));

gulp.task('ts:view', () =>
  gulp.watch(config.ts.dist.src, { ignoreInitial: false }, () =>
    compile(config.ts.dist.src)
      .pipe($.unassert())
      .pipe($.header(config.banner))
      .pipe(gulp.dest('./gh-pages/assets/js/lib'))));

gulp.task('karma:dev', done =>
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: config.browsers,
    preprocessors: {
      'dist/*.js': ['espower']
    },
  }, done).start());

gulp.task('karma:test', done =>
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: config.browsers,
    preprocessors: {
      'dist/*.js': ['coverage', 'espower']
    },
    reporters: ['dots', 'coverage'],
    concurrency: 1,
    singleRun: true
  }, done).start());

gulp.task('karma:ci', done =>
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: config.browsers,
    preprocessors: {
      'dist/*.js': ['coverage', 'espower']
    },
    reporters: ['dots', 'coverage', 'coveralls'],
    concurrency: 1,
    singleRun: true
  }, done).start());

gulp.task('clean', () =>
  del(config.clean));

gulp.task('install', done => {
  shell('npm i --no-shrinkwrap');
  done();
});

gulp.task('update', done => {
  shell('bundle update');
  shell('ncu -ua');
  shell('npm i -DE typescript@next --no-shrinkwrap');
  shell('npm i --no-shrinkwrap');
  done();
});

gulp.task('dev',
  series(
    'clean',
    parallel(
      'ts:dev',
      'karma:dev',
    )));

gulp.task('test',
  series(
    'clean',
    series(
      'ts:test',
      'karma:test',
      'ts:dist',
    )));

gulp.task('dist',
  series(
    'clean',
    series(
      'ts:dist',
    )));

gulp.task('site',
  series(
    'dist',
  ));

gulp.task('view',
  series(
    'clean',
    () =>
      shell([
        'concurrently',
        '"gulp dev"',
        '"gulp ts:view"',
        '"bundle exec jekyll serve -s ./gh-pages -d ./gh-pages/_site --incremental"'
      ].join(' ')),
  ));

gulp.task('ci',
  series(
    'clean',
    series(
      'ts:test',
      'karma:ci',
      'karma:ci',
      'karma:ci',
      'dist',
      'site',
    )));
