// Requis
var gulp = require('gulp');

//Plugins
var //rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    cssbeautify = require('gulp-cssbeautify'),
    license = require('gulp-header'),
    fs = require('fs'),
    beautifier = require('gulp-jsbeautifier'),
    gulpignore = require('gulp-ignore');
//-----------------------//


// Task css = CSScomb style formatter + beautify-css (reindent and reformat css) + autoprefixer prefix css (source -> destination)
gulp.task('css', function() {
    return gulp.src(['./**/*.css', '!./node_modules/**', '!./tmp/**', '!./app/common/**', '!./**/*.min.js', '!./**/*.min.css'])
        .pipe(plumber({}))
        .pipe(cssbeautify({
            indent: '  ',
            openbrace: 'separate-line',
            autosemicolon: true
        }))
        .pipe(gulp.dest('./dist'));
});

//Header on file JS & CSS 
gulp.task('license', function() {
    var year = (new Date()).getFullYear();
    gulp.src(['./**/*.js', '!./**/*.min.js', '!./node_modules/**', '!./tmp/**', '!./app/common/**'])
        .pipe(license(fs.readFileSync('header.md', 'utf8'), {
            year: year
        }, 0.9))
        .pipe(gulp.dest('.'));
});

//Clean indentation Js, css, html
gulp.task('beautifier', function() {
    gulp.src(['./**/*.css', './**/*.html', './**/*.js', '!./node_modules/**', '!/tmp/**', '!./**/*.min.js', '!./**/*.min.css']) //['./**/*.css', './**/*.html', './**/*.js','!./node_modules/**','!/tmp/**']
        .pipe(beautifier({
            "indent_size": 4,
            "indent_char": '  ',
            // other options 
            "js": {
                // other options 
                "indent_size": 3
            }
        }))
        .pipe(gulp.dest('./'));
});

// Task default

gulp.task('default', ['license']);