var gulp = require('gulp');

var jshint = require("gulp-jshint");

gulp.task('test', function(){
    gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('fail'));
});