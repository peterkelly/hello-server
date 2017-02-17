var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var fs = require('fs');

var tsProject = ts.createProject('src/tsconfig.json',{
    // The following is required to use the version of typescript
    // specified in our package.json, rather than the version that
    // comes with gulp-typescript
    typescript: require('typescript')
});


gulp.task('compile',function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest('dist'));
});

gulp.task('clean',function() {
    del(['dist']);
});

gulp.task('default',function(cb) {
    runSequence(
        'clean',
        'compile',
        cb);
});
