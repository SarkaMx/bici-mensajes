var bowerFiles = require('main-bower-files');
var gulp       = require('gulp');
var inject     = require('gulp-inject');
var notify     = require('gulp-notify');

gulp.task( 'inject', function() {

    'use strict';

    return gulp.src('source/index.html')
        .pipe( inject(
            gulp.src(rutasScripts(true), {read: false}), {
                relative: false,
                transform: function(filepath, file, index, length, targetFile) {

                    return '<script src="' + filepath.replace('/public/', '') +
                        '"></script>';
                }
            }) )
        .pipe( notify({
            title: 'inyectados los scripts :D',
            message: ' :S',
            icon: __dirname + '/node_modules/gulp-notify/assets/gulp.png'
        }))
        .pipe(gulp.dest('./source'));
});

function rutasScripts( dev ) {

    'use strict';

    if( !dev ) {
        dev = false;
    }

    var scripts,
        i = 0;

    /**
     * [scripts description]
     * @type {string[]}
     */
    scripts = bowerFiles({
        filter: '/**/*.js'
    }).concat( [
        'source/js/**/*.js'
    ] );

    /**
     * agrega elementos despues de jquery y antes  los scripts de la aplicacion
     */
    var jquery_script = null;

    for( i = 0 ; i < scripts.length ; i++ ) {
        if( scripts[i].indexOf('jquery') > -1 ) {
            
            break;
        }
    }


    /**
     * elimina scripts extra
     */
    /*for( i = 0 ; i < scripts.length ; i++ ) {
     if( scripts[i].indexOf('videogular-ima-ads') > -1 ) {
     scripts.splice( i, 1 );
     }
     }*/


    return scripts;
}