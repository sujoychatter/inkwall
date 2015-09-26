var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var server = require('gulp-express');

var files = [{path: 'assets/react/views/HelloWorld.jsx', source: 'HelloWorld.js'}];

gulp.task('browserify:js', function(){
	files.forEach(function(file){
		browserify(file.path)
			.transform(reactify)
			.bundle()
			.pipe(source(file.source))
			.pipe(gulp.dest('public/react/views'));
	});
});

gulp.task('sass', function () {
  gulp.src('assets/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('js', function () {    
  gulp.src('assets/react/components/**/*.jsx')
    .pipe(babel())
    .pipe(gulp.dest('public/react/components'));
});

gulp.task('copyreact', function() {
   gulp.src('assets/react.min.js')
   .pipe(gulp.dest('public/react/'));
});

gulp.task('copyimages', function() {
   gulp.src('assets/images/**/*.*')
   .pipe(gulp.dest('public/images/'));
});

gulp.task('watch', function() {
    gulp.watch("assets/react/components/**/*.jsx", ["js", "browserify:js"])
});

gulp.task('sass:watch', function () {
  gulp.watch('assets/stylesheets/**/*.scss', ['sass']);
});

gulp.task('default', ['js', 'sass', 'copyreact','browserify:js', 'copyimages', 'watch', 'sass:watch']);
