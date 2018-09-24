const gulp = require('gulp');
const replace = require('gulp-replace');
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
const jsonMinifyTaskName = 'json-minify';
const imageMinifyTaskName = 'image-minify';

gulp.task('default', [plotlyTaskName]);

gulp.task(plotlyTaskName, function () {
  return gulp.src('node_modules/plotly.js/dist/plotly.min.js')
    .pipe(uglify()
      .on('error', function (e) {
        console.log(e);
      })
    )
    .pipe(gulp.dest('src/assets/js/'))
    .pipe(notify({
      message: 'Scripts task complete!',
      onLast: true
    }));
});

gulp.task('after-build', [htmlMinifyTaskName, cssMinifyTaskName, jsonMinifyTaskName, imageMinifyTaskName]);

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
