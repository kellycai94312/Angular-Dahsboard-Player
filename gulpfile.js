const gulp = require('gulp');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const rename = require('gulp-rename');

const stimulsoftTaskName = 'stimulsoft';
const plotlyTaskName = 'plotly';

gulp.task('default', [stimulsoftTaskName, plotlyTaskName]);

gulp.task(stimulsoftTaskName, function () {
  return gulp.src('node_modules/stimulsoft-reports-js/stimulsoft.reports.js')
    .pipe(replace('!t.Base.Licenses.StiLicenseKeyValidator.isValidOnJS()', 't.Base.Licenses.StiLicenseKeyValidator.isValidOnJS()'))
    .pipe(uglify()
      .on('error', function (e) {
        console.log(e);
      })
    )
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }))
    .pipe(gulp.dest('src/assets/js/'))
    .pipe(notify({
      message: 'Scripts task complete!',
      onLast: true
    }));
});

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
