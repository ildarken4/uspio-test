const gulp = require('gulp');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const sourcemaps = require('gulp-sourcemaps');
const htmlPartial = require('gulp-html-partial');
const clean = require('gulp-clean');
const isProd = process.env.NODE_ENV === 'prod';

const htmlFile = [
    'src/*.*'
]

function html() {
    return gulp.src(htmlFile)
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        }))
        .pipe(gulpIf(isProd, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('build'));
}

function css() {
    return gulp.src('src/sass/*.scss')
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(gulpIf(isProd, cssmin()))
        .pipe(gulp.dest('build/css/'));
}

function fonts() {
    return gulp.src('src/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('build/fonts'));
}

function js() {
    return gulp.src('src/js/*.js')
        .pipe(jsImport({
            hideConsole: true
        }))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest('build/js'));
}

function img() {
    return gulp.src('src/images/**/*.*')
        .pipe(gulpIf(isProd, imagemin()))
        .pipe(gulp.dest('build/images/'));
}



function serve() {
    browserSync.init({
        open: true,
        server: './build'
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}


function watchFiles() {
    gulp.watch('src/**/*.*', {usePolling: true}, gulp.series(html, browserSyncReload));
    gulp.watch('src/**/*.scss', {usePolling: true}, gulp.series(css, browserSyncReload));
    gulp.watch('src/**/*.js', {usePolling: true}, gulp.series(js, browserSyncReload));
    gulp.watch('src/images/**/*.*', {usePolling: true}, gulp.series(img));
    gulp.watch('src/**/*.{eot,svg,ttf,woff,woff2}', {usePolling: true}, gulp.series(fonts));

    return;
}

function del() {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
}

exports.css = css;
exports.html = html;
exports.js = js;
exports.del = del;
exports.serve = gulp.parallel(html, css, js, img, fonts, watchFiles, serve);
exports.default = gulp.series(del, html, css, js, img, fonts);
