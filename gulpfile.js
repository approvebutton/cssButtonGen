// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

var gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    concat    = require('gulp-concat'),
    rename    = require('gulp-rename'),
    jshint    = require('gulp-jshint'),
    uglify    = require('gulp-uglify'),
    less      = require('gulp-less'),
    csso      = require('gulp-csso'),
    es        = require('event-stream'),
    webserver = require('gulp-webserver'),
    notify    = require('gulp-notify'),
    slim      = require('gulp-slim'),
    plumber   = require('gulp-plumber'),
    imagemin  = require('gulp-imagemin');


// Copy all application files except *.less and .js into the `build` folder
gulp.task('copy', function () {
    return es.concat(
        gulp.src(['src/img/**'])
            .pipe(gulp.dest('build/img')),
        gulp.src(['src/js/vendor/**'])
            .pipe(gulp.dest('build/js/vendor')),
        gulp.src(['src/lib/**'])
            .pipe(gulp.dest('build/lib')),
        gulp.src(['src/*.*'])
            .pipe(gulp.dest('build'))
    );
});

// Compile Slim files to HTML
gulp.task('slim', function(){
    return gulp.src('src/slim/*.slim')
        .pipe(slim({ pretty: true }))
        .pipe(gulp.dest('build'))
});

// Concate, minify and check JS Files
gulp.task('scripts', function () {
    return es.concat(
        // Detect errors and potential problems in your JavaScript code
        // You can enable or disable default JSHint options in the .jshintrc file
         gulp.src(['src/js/**/*.js', '!src/js/vendor/**/*.js'])
             .pipe(jshint('.jshintrc'))
             .pipe(jshint.reporter(require('jshint-stylish'))),

        // Concatenate, minify and copy all JavaScript
        gulp.src(['src/js/**/*.js', '!src/js/vendor/**/*.js'])
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest('build/js'))
       
    );
});

// Compile  LESS files to CSS
gulp.task('styles', function(){
    return gulp.src('src/less/app.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(rename('style.css'))
        .pipe(csso())
        .pipe(gulp.dest('build/css'))
        
});

// Minify Images
gulp.task('compress', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});

// LiveReload Server
gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            open: { browser: 'chrome' }
        }));
});

// Watch Task
gulp.task('watch', function (){
    // Watch .js files and run tasks if they change
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch .less files and run tasks if they change
    gulp.watch('src/less/**/*.less', ['styles']);

    // Watch .slim files and run task if they change
    gulp.watch('src/slim/**/*.slim', ['slim']);

    // Watch add images
    gulp.watch('src/img/**/*', ['compress']);
});


// The default task (called when you run `gulp`)
gulp.task('default', ['copy', 'compress', 'slim', 'scripts', 'styles', 'watch', 'webserver' ]);
