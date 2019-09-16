const gulp = require('gulp');
// const babel = require('gulp-babel');
const bump = require('gulp-bump');
const gulpUtil = require('gulp-util');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const jsonminify = require('gulp-jsonminify');
const imagemin = require('gulp-imagemin');
const replace = require('replace-in-file');

const plotlyTaskName = 'plotly';
const htmlMinifyTaskName = 'html-minify';
const cssMinifyTaskName = 'css-minify';
const jsMinifyTaskName = 'js-minify';
const jsonMinifyTaskName = 'json-minify';
const imageMinifyTaskName = 'image-minify';
const replaceVersionTaskName = 'replace-version';
const incrementVersionTaskName = 'increment-version';

gulp.task(plotlyTaskName, function () {
  return gulp.src('node_modules/plotly.js/dist/plotly.min.js')
  /* TODO: Add minify
  .pipe(babel({presets: ['env'], "compact": true}))
  .pipe(uglify())*/
    .pipe(gulp.dest('src/assets/js/'));
});

gulp.task(htmlMinifyTaskName, function () {
  return gulp.src(['dist/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task(cssMinifyTaskName, function () {
  return gulp.src('dist/**/*.css')
    .pipe(cleanCss({
      level: {1: {specialComments: 0}},
      removeComments: true
    }))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task(jsMinifyTaskName, function () {
  return gulp.src('dist/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task(jsonMinifyTaskName, function () {
  return gulp.src('dist/**/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task(imageMinifyTaskName, function () {
  return gulp.src('dist/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task(replaceVersionTaskName, function (done) {
  const package = require('./package.json');
  const buildVersion = package.version;
  let changedFiles = replace.sync({
      files: 'src/environments/environment.*',
      from: /version: '(.*)'/g,
      to: "version: '" + buildVersion + "'",
      allowEmptyPaths: false,
    }
  );
  gulpUtil.log(`Changed files '${changedFiles}'`);
  gulpUtil.log(`Build version set: ${buildVersion}`);
  done();
});

gulp.task(incrementVersionTaskName, function () {
  return gulp.src('./package.json')
    .pipe(bump({type: 'prerelease'}))
    .pipe(gulp.dest('./'));
});

gulp.task('default', gulp.series([plotlyTaskName, incrementVersionTaskName, replaceVersionTaskName]));

gulp.task('after-build', gulp.parallel(htmlMinifyTaskName, cssMinifyTaskName, jsonMinifyTaskName, imageMinifyTaskName));
