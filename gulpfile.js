// Requis
var gulp = require('gulp');

//Plugins
var //rename = require('gulp-rename'),
		license = require('gulp-header-license'),
		fs = require('fs'),
		prettify = require('gulp-jsbeautifier');


//Header on file JS & CSS
gulp.task('license', function() {
		var year = (new Date()).getFullYear();
		gulp.src(['app/**/*.js', 'controllers/*.js', 'definitions/*.js', 'install/**/*.js', 'models/*.js', 'modules/*.js', 'source/*.js'], {
						base: "./"
				})
				.pipe(license(fs.readFileSync('header.md', 'utf8'), {
						year: year
				}, 0.8))
				.pipe(gulp.dest('./'));
});

//Clean indentation Js, css, html
gulp.task('beautify', function() {
		gulp.src(['./**/*.css', './**/*.html', './**/*.js', '!./public/js/**', '!./public/assets/**', '!./node_modules/**', '!./tmp/**', '!./**/*.min.js', '!./**/*.min.css'])
				.pipe(prettify({
						"indent_size": 1,
						"indent_char": '\t',
						// other options
						"js": {
								// other options
								"indent_size": 2
						}
				}))
				.pipe(prettify.reporter())
				.pipe(gulp.dest('.'));
});

// Task default

gulp.task('default', ['license', 'beautify']);