const gulp = require('gulp'),
      replace = require('gulp-replace'),
      uglify = require('gulp-uglify'),
      notify = require('gulp-notify'),
      rename = require('gulp-rename');

gulp.task('crack-and-minify-stimulsoft', function () {
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
    .pipe(notify({
      message: 'Scripts task complete!',
      onLast: true
    }));
});
