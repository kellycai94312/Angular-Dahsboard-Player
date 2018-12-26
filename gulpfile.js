const gulp = require('gulp');
const replace = require('gulp-replace');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const jsonminify = require('gulp-jsonminify');
const imagemin = require('gulp-imagemin');

const plotlyTaskName = 'plotly';
const htmlMinifyTaskName = 'html-minify';
const cssMinifyTaskName = 'css-minify';
const jsMinifyTaskName = 'js-minify';
const jsonMinifyTaskName = 'json-minify';
const imageMinifyTaskName = 'image-minify';

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

gulp.task('default', gulp.series(plotlyTaskName));
gulp.task('after-build', gulp.parallel(htmlMinifyTaskName, cssMinifyTaskName, jsonMinifyTaskName, imageMinifyTaskName));
