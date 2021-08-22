const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const prefix = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const gulpCopy = require('gulp-copy');
const del = require('del');

function browser() {
    browserSync.init({
        server: {
            baseDir: './build/'
        },
        notify: false
    });
}

function templates() {
    return src('dev/pug/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(dest('build/'))
}

function watchFiles() {
    watch("dev/scss/**/*.scss", css);
    watch(['dev/pug/*.pug', 'dev/pug/chunks/*.pug'], parallel(templates)).on('change', browserSync.reload);
}

function css() {
    return src("dev/scss/**/*.scss")
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
        .pipe(dest("build"))
        .pipe(browserSync.stream());
}

function copyAssets() {
    return src('./dev/assets/**/*.*')
        .pipe(gulpCopy('./build/assets', { prefix: 2 }));
}

exports.css = css;
exports.default = series(series(css), parallel(browser, watchFiles, templates, copyAssets));
