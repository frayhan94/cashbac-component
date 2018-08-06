'use strict';

let autoprefixer = require('gulp-autoprefixer');
let del = require('del');
let gulp = require('gulp');
let runSequence = require('run-sequence');
let concat = require('gulp-concat');
let minify = require('gulp-minify');
let cleanCss = require('gulp-clean-css');
let rev = require('gulp-rev');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();
/* let gulpDocumentation = require('gulp-documentation'); */

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('compile-scss',function() {
    return gulp.src('./component/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});
gulp.task('styles', function () {
    return gulp.src('./public/css/**/*.css')
    // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(concat('stylesheet.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./public/build/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

/*
    * Only bundling some of these file at this moment
    * 1. ko.nav-paging.js
    * 2. settlements-settled.js
    * And exclude all js files under dependency folder
    *
    *
*/
gulp.task('scripts', function() {
    return gulp.src([
        './component/modal/modal.js',
        './component/tab/tab.js',
        './component/thumbnail/thumbnail.js'
    ])
    // Minify the file
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('bundle.js'))
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('./public/build/js'));
});

gulp.task('clean-js', function () {
    return del([
        'public/build/js/*.js'
    ]);
});

gulp.task('clean-css', function () {
    return del([
        'public/build/css/*.css'
    ]);
});

// Gulp task stylesheet
gulp.task('stylesheet', function() {
    runSequence(
            'compile-scss',
            'styles'
    );
});

gulp.task('watch',  ['browserSync','stylesheet'], function() {
    gulp.watch('./component/**/*.scss', ['stylesheet']);
    gulp.watch('./component/**/*.js', ['scripts']);
});



// Gulp task to minify all files
gulp.task('default', ['clean-js','clean-css'], function () {
    runSequence(
        'compile-scss',
        'styles',
        'scripts'
    );
});


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})


/*
    gulp.task('documentation-html-example', function () {
    return gulp.src('./component/!**!/!*.js')
        .pipe(gulpDocumentation('html'))
        .pipe(gulp.dest('html-documentation'));
    });
*/
