'use strict';

/********************************
*********************************
			VARS
*********************************
*********************************/

var gulp = require('gulp'),
	fs = require('fs'),
	del = require('del'),
	header = require('gulp-header'),
	jshint = require('gulp-jshint'),
	processhtml = require('gulp-processhtml'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	concatCss = require("gulp-concat-css"),
	minifyCss = require("gulp-minify-css"),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	plumber = require('gulp-plumber'),

	connect = require('gulp-connect'),

	pkg = require('./package.json'),

	banner = ['/**',
  ' * <%= pkg.author %>',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' */',
  ''].join('\n');


/********************************
*********************************
			TASKS
*********************************
*********************************/

gulp.task('default', ['connectToserver', 'build', 'watch']);
gulp.task('copyResources', ['copyImages', 'copyFonts']);
gulp.task('build', ['clearDist', 'makeDist', 'processStyles', 'processScripts', 'processHtml']);

gulp.task('clearDist', clearDist);
gulp.task('clearDistResources', clearDist);
gulp.task('makeDist', makeDist);

gulp.task('processHtml', processHtml);
gulp.task('processStyles', processStyles);
gulp.task('processScripts', processScripts);

gulp.task('copyImages', copyImages);
gulp.task('copyFonts', copyFonts);

gulp.task('connectToserver', connectToserver);

gulp.task('watch', watch);
gulp.task('watchCss', watchCss);
gulp.task('watchScripts', watchScripts);
gulp.task('watchHtml', watchHtml);

/********************************
*********************************
			FUNCTIONS
*********************************
*********************************/

function clearDist() {	
	del(['dist/**/**/*.js', 'dist/**/**/*.css', ], function (err) {
		console.log('scripts and styles in dist was deleted');
	});
}
function clearDistResources() {	
	del(['dist/img/*.*', 'dist/css/fonts/**/*.*', ], function (err) {
		console.log('Images and fonts in dist was deleted');
	});
}

function makeDist() {	
	if (!fs.existsSync('./dist')) {
		fs.mkdirSync('./dist');
	}
}

/* Process something */

function processHtml() {
	gulp.src('src/index.html')
		.pipe(plumber())
		.pipe(processhtml('index.html'))
		.pipe(gulp.dest('./'))
		.pipe(connect.reload())
		.pipe(notify('Html processed!'));	
};

function processStyles() {
	gulp.src([
			'src/vendors/bootstrap/css/bootstrap.min.css', 
			'src/vendors/jquery/jquery-ui-1.11.1.custom/jquery-ui.min.css', 
			'src/css/**/**/*.css'
		]).pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
        }))
		.pipe(concatCss("bundle.css"))
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(rename('bundle.min.css'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload())
		.pipe(notify('Styles processed!'))
}

function processScripts() {
	gulp.src([
			'src/vendors/jquery/jquery-1.11.0.js',
			'src/vendors/jquery/jquery-ui-1.11.1.custom/jquery-ui.js',
			'src/vendors/bootstrap/bootstrapjs/bootstrap.min.js',
			'src/vendors/autoprefixer/autoprefixer.js',
			'src/js/namespace.js',
			'node_modules/css-rules.js/css-rules.js',
			'src/js/plugins/**/*.js',
			'src/js/controls/**/*.js',
			'src/js/main.js'
		]).pipe(plumber())
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload())
		.pipe(notify('Scripts processed!'))
};


/* Copy only tasks */

function copyImages() {
	gulp.src('src/img/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('dist/img'))
		.pipe(notify('Images copied!'));
};

function copyFonts() {
	gulp.src('src/css/fonts/**/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('dist/css/fonts'))
		.pipe(notify('Fonts copied!'));
}

/* Watch tasks */

function watchCss() {
	gulp.watch('src/css/**/*.css', ['processStyles']);
};

function watchScripts() {
	gulp.watch('src/js/**/*.js', ['processScripts']);
};

function watchHtml() {
	gulp.watch('src/*.html', ['processHtml']);
};

function watch() {
	gulp.run(['watchCss', 'watchScripts', 'watchHtml']);
};

function notifyChanges(event){
	notify(event.path+' -> '+event.type);
};


function connectToserver() {
	connect.server({
		root: './',
		livereload: true
	});
};