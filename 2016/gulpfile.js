var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer')
	sourcemaps = require('gulp-sourcemaps')
	browsersync = require('browser-sync').create();

function scssAlert(error){
	notify.onError({title: "SCSS Error", message: "Check your terminal", sound: "Sosumi"})(error); //Error Notification
	console.log(error.toString());
	this.emit("end");
};


function jsAlert(error){
	notify.onError({title: "JS Error", message: "Check your terminal", sound: "Sosumi"})(error); //Error Notification
	console.log(error.toString());
	this.emit("end");
};


// Browser Sync - Live Reload Changes
gulp.task('browsersync', function() {
	browsersync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('scss/*.scss', ['sass']);
	gulp.watch('*.html').on('change', browsersync.reload);
});



// JS Uglifier
gulp.task('scripts', function() {
	return gulp.src('js/*.js')
			.pipe(plumber({errorHandler: jsAlert}))
			.pipe(uglify())
			.pipe(gulp.dest('build/js'))
			.pipe(browsersync.reload({
				stream: true
			}));
});


// SASS Compiler/minifier
gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
			.pipe(sourcemaps.init())
			.pipe(plumber({errorHandler: scssAlert}))
			.pipe(sass({outputStyle: 'compressed'}))
			.pipe(sourcemaps.write())
			.pipe(autoprefixer())
			.pipe(gulp.dest('build/css'))
			.pipe(browsersync.reload({
				stream: true
			}));
});

gulp.task('default', ['scripts', 'sass', 'browsersync']);