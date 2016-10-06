// Requis
var gulp = require('gulp');

//Plugins
var rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	license = require('gulp-header'),
	csscomb = require('gulp-csscomb'),
	cssbeautify = require ('gulp-cssbeautify'),
	gulpignore = require('gulp-ignore'),
  beautifier = require('gulp-jsbeautifier'),
  autoprefixer = require('autoprefixer'),
  plumber = require('gulp-plumber'),
	fs = require('fs');
	
//-----------------------//


// Task css = CSScomb style formatter + beautify-css (reindent and reformat css) + autoprefixer prefix css (source -> destination)
gulp.task('css', function () {
  return gulp.src(['./**/*.css','!./node_modules/**', '!./tmp/**','!./app/common/**'])
    .pipe(plumber({}))
    //.pipe(csscomb())
    .pipe(cssbeautify({indent: '  ',
                       openbrace: 'separate-line',
                       autosemicolon: true
                      }))
    //.pipe(autoprefixer())
    .pipe(gulp.dest('./'));
});

//Header on file JS & CSS 
gulp.task('license', function () {
  var year = (new Date()).getFullYear();
    gulp.src(['./**/*.js' , '!./node_modules/**' , './tmp/**' , '!./app/common/**'])
      .pipe(license(fs.readFileSync('LICENSE.md', 'utf8'), {year: year}, 0.9))
      .pipe(gulp.dest('./'));
});




//Clean indentation Js, css, html
//gulp.task('beautifier', function() {
//  gulp.src(['./**/*.css', './**/*.html', './**/*.js'])
//    .pipe(prettify())
//    .pipe(gulp.dest('./dist'));
//});

// Task default

gulp.task('default', ['css' , 'license']);