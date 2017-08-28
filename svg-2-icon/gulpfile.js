var gulp = require('gulp');
var async = require('async');
var consolidate = require('gulp-consolidate');
var iconfont = require('gulp-iconfont');

// icon fonts
gulp.task('default', function (done) {
    var iconStream = gulp.src(['./src/svg/*.svg'])
        .pipe(iconfont({
            fontName: 'i-icon',
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            fontWeight:10,
            normalize: true,
            prependUnicode: false,
            fontHeight: 1001,
            centerHorizontally: true,
        }));
    async.parallel([
        function handleIndex(cb) {
            iconStream.on('glyphs', function (glyphs, options) {
                gulp.src('src/html/index.html')
                    .pipe(consolidate('lodash', {
                        glyphs: glyphs,
                        className: 'icon'
                    }))
                    .pipe(gulp.dest('dist'))
                    .on('finish', cb);
            });
        },
        function handleGlyphs(cb) {
            iconStream.on('glyphs', function (glyphs, options) {
                gulp.src('src/css/icons.css')
                    .pipe(consolidate('lodash', {
                        glyphs: glyphs,
                        fontName: 'i-icon',
                        fontPath: '../fonts/',
                        className: 'icon'
                    }))
                    .pipe(gulp.dest('dist/css'))
                    .on('finish', cb);
            });
        },
        function handleFonts(cb) {
            iconStream
                .pipe(gulp.dest('dist/fonts'))
                .on('finish', cb);
        }
    ], done);
});