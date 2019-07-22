var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    smartGrid = require('smart-grid'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    del = require('del');

//Компиляция less файлов
gulp.task('less', function () {
    return gulp.src('src/less/main.less')
      .pipe(less())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({stream: true}));
});

//Разметка базовой длины
gulp.task('grid', function(){
    smartGrid('src/less', {
        container:{
            maxWidth: '1100px'
        }
    })
})

//Сжатие js файлов и минификация
gulp.task('scripts', function(){
    return gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js/min'));
})

//Browser sync
gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false,
    });
})

// Объединение js файлов 
gulp.task('concat-js', function(){
    del.sync('src/js/all.js');
    return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('src/js'));
})

//Наблюдатель
gulp.task('watch', function(){
    gulp.watch('src/less/**/*.less', gulp.parallel('less'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/*.js').on('change', gulp.parallel('concat-js'));
});

//Очищение папки dist

gulp.task('clean', async function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

//Сборка
gulp.task('prebuild', async function(){
    var buildCss = gulp.src('src/css/main.css')
    .pipe(gulp.dest('dist/css'));

    var buildMinJs = gulp.src('src/js/min/*.js')
    .pipe(gulp.dest('dist/js/min'));

    var buildJS = gulp.src('src/js/all.js')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));

    var buildImg = gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'));
})

//Dev настройки.
gulp.task('default', gulp.parallel('browser-sync','less', 'concat-js', 'watch'));

//Build
gulp.task('build', gulp.parallel('prebuild', 'clean'));