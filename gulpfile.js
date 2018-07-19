/*
* @Author: ww
* @Date:   2018-06-13 11:37:24
* @Last Modified by:   ww
* @Last Modified time: 2018-07-19 13:17:30
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var reload = browserSync.reload;

gulp.task('sass', function() {
	gulp.src('app/scss/*.scss')
	.pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(reload({ stream:true }));
});
gulp.task('babel', () =>
    gulp.src('app/es6_js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('app/js'))
);

// 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

   gulp.watch('app/scss/*.scss', ['sass']);
   gulp.watch('app/es6_js/*.js', ['babel']);
   gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'app'}, reload);
});


 
