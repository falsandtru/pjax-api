const gulp = require('gulp');
const glob = require('glob');
const shell = cmd => require('child_process').execSync(cmd, { stdio: [0, 1, 2] });
const del = require('del');
const extend = require('extend');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const $ = require('gulp-load-plugins')();
const seq = require('run-sequence');
const browserify = require('browserify');
const tsify = require('tsify');
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
    `/*! ${pkg.name} v${pkg.version} ${pkg.repository.url} | (c) 2016, ${pkg.author} | ${pkg.license} License */`,
    ''
  ].join('\n'),
  clean: {
    dist: 'dist'
  }
};

function compile(paths) {
  let done = true;
  return browserify({
      basedir: '.',
      debug: false,
      entries: Object.values(paths).map(p => glob.sync(p)),
      bundleExternal: false,
      cache: {},
      packageCache: {}
    })
    .require(`./${pkg.name}.ts`, { expose: pkg.name })
    .plugin(tsify, require('./tsconfig.json').compilerOptions)
    .bundle()
    .on("error", err => done = console.log(err + ''))
    .pipe(source(`${pkg.name}.js`))
    .pipe(buffer())
    .pipe($.derequire())
    .once("finish", () => done || process.exit(1));
}

gulp.task('ts:watch', function () {
  gulp.watch(config.ts.test.src, ['ts:test']);
});

gulp.task('ts:test', function () {
  return compile(config.ts.test.src)
    .pipe(gulp.dest(config.ts.test.dest));
});

gulp.task('ts:dist', function () {
  return compile(config.ts.dist.src)
    .pipe($.unassert())
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
    'site',
    function () {
      done();
    }
  );
});
