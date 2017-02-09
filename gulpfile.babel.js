'use strict';

import gulp from 'gulp';
import connect from 'gulp-connect';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import config from './rollup.config';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';

let cache;

gulp.task('build', function () {
  return rollup(Object.assign(config, {cache}))
    .pipe(plumber())
    .on('error', function (err) {
      gutil.log(err);
      this.emit('end');
    })
    .on('bundle', function(bundle) {
      cache = bundle;
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'dest',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./dest/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.js'], ['build']);
  gulp.watch(['./dest/*.html'], ['html']);
  gulp.watch(['./src/styles/*.css'], ['build']);
});

gulp.task('default', ['connect', 'watch']);