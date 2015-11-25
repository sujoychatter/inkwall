var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var nodeInspector = require('gulp-node-inspector');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

// gulp.task('concatapp', function() {
//   return gulp.src(['assets/vendor/essentials/**/*.js'])
//     .pipe(concat('essentials.js'))
//     .pipe(gulp.dest('public/'));
// });

gulp.task('js', function () {
	gulp.src('assets/react/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('public/react'));

});

gulp.task('browserify:js', function () {
	browserify({entries: 'assets/react/main.js'})
		.transform(
			babelify.configure({
    			plugins: ["object-assign"]
    		})
    	)
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('public/react/'));
});

gulp.task('sass', function () {
	gulp.src('assets/stylesheets/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('copyvendor', function () {
	gulp.src('assets/vendor/**/*.*')
		.pipe(gulp.dest('public/'));
});

gulp.task('copyimages', function () {
	gulp.src('assets/images/**/*.*')
		.pipe(gulp.dest('public/images/'));
});

gulp.task('inspector', function () {
	console.log('[info] Visit http://localhost:8080/debug?port=5858 to start debugging.')
	return gulp.src([])
		.pipe(nodeInspector({
			preload: false,
		}));
});

gulp.task('migrate:latest', shell.task([
	"knex --knexfile server/config/knexfile.js  migrate:latest"
]));

gulp.task('server', function () {
	nodemon({
		script: 'app.js',
		watch: ['assets', 'views'],
		nodeArgs: ['--debug']
	}).on('restart', function () {
		setTimeout(function () {
			reload();
		}, 5000);
	})
});

gulp.task('watch', function () {
	gulp.watch(["assets/react/**/*.js"], ["js", "browserify:js"]);
	gulp.watch('assets/stylesheets/**/*.scss', ['sass']);
});

gulp.task('default', ['js', 'sass', 'copyvendor', 'browserify:js', 'copyimages', 'watch']);
