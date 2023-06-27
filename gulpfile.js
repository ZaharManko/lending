const {dest, parallel, series, src, watch, } = require('gulp')
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del')


const browsersync = () =>{
    browserSync.init({
        server:{
            baseDir:'app/'
        }
    })
}

const cleanDist = () =>{
    return del('dist')
}

const styles = () =>{
    return src('./app/scss/style.scss')
    .pipe(scss({outputStyle:'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist:['last 10 version']
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())

}

const scripts = () =>{
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'app/js/main.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

const images = () =>{
    return src('app/images/**/*')
    .pipe(imagemin(
        [
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]
    ))
    .pipe(dest('dist/images'))
}

const build = () =>{
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html',//тут поправ як що не буде працьвати шось з html
    ], {base:'app'})
    .pipe(dest('dist'))
}

const watching = () =>{
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/**.html']).on('change', browserSync.reload);
    watch(['app/js/main.js', '!app/js/main.min.js'], scripts)
}

exports.styles = styles;
exports.images = images;
exports.cleanDist = cleanDist;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build   = series(cleanDist, images, build)

exports.default = parallel(styles,scripts, browsersync, watching)

