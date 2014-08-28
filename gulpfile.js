// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

var gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    clean     = require('gulp-clean'),
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
    plumber   = require('gulp-plumber');

gulp.task('clean', function () {
    // Clear the destination folder
    gulp.src('build/**/*.*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('copy', function () {
    // Copy all application files except *.less and .js into the `build` folder
    return es.concat(
        gulp.src(['src/img/**'])
            .pipe(gulp.dest('build/img')),
        gulp.src(['src/js/vendor/**'])
            .pipe(gulp.dest('build/js/vendor')),
        gulp.src(['src/*.*'])
            .pipe(gulp.dest('build'))
    );
});

gulp.task('slim', function(){
    return gulp.src('src/slim/*.slim')
        .pipe(slim({ pretty: true }))
        .pipe(gulp.dest('build'))
});

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

gulp.task('styles', function(){
    // Compile LESS files
    return gulp.src('src/less/app.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(rename('style.css'))
        .pipe(csso())
        .pipe(gulp.dest('build/css'))
        
});


gulp.task('webserver', function() {
    // LiveReload Server
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            open: { browser: 'chrome' }
        }));
});



gulp.task('watch', function (){
    // Watch .js files and run tasks if they change
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch .less files and run tasks if they change
    gulp.watch('src/less/**/*.less', ['styles']);

    // Watch .slim files and run taska if they change
    gulp.watch('src/slim/**/*.slim', ['slim']);


});

// The build task (used to store all files that will go to the server)
gulp.task('build', ['clean', 'copy', 'scripts', 'slim', 'styles']);

// The default task (called when you run `gulp`)
gulp.task('default', ['clean', 'copy', 'slim', 'scripts', 'styles', 'watch', 'webserver' ]);
