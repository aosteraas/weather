var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat')
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
	gulp.watch('build/js/*.js', ['scripts']);
	gulp.watch('build/scss/*.scss', ['sass']);
	gulp.watch('*.html').on('change', browsersync.reload);
});



// JS Concat
gulp.task('scripts', function() {
	return gulp.src('build/js/*.js')
			.pipe(plumber({errorHandler: jsAlert}))
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest('dist/js/'))
			.pipe(browsersync.reload({
				stream: true
			}));
});


// SASS Compiler/minifier
gulp.task('sass', function() {
	return gulp.src('build/scss/*.scss')
			.pipe(sourcemaps.init())
			.pipe(plumber({errorHandler: scssAlert}))
			.pipe(sass({outputStyle: 'compressed'}))
			.pipe(sourcemaps.write())
			.pipe(autoprefixer())
			.pipe(gulp.dest('dist/css/'))
			.pipe(browsersync.reload({
				stream: true
			}));
});

gulp.task('default', ['scripts', 'sass', 'browsersync']);