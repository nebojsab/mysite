/**
 * Created by nebojsabrnjasevic on 8/9/16.
 */
module.exports = function (grunt) {

    //Configure task(s)
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: ['src/js/*.js', 'node_modules/bootstrap/dist/js/bootstrap.js'],
                dest: 'js/script.min.js'
            },
            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false,
                    preserveComments: 'all'
                },
                src: ['src/js/*.js', 'node_modules/bootstrap/dist/js/bootstrap.js'],
                dest: 'js/script.min.js'
            }
        },
        less: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'css/styles.css' : ['src/less/app.less', 'src/less/base/bootstrap.less']
                }
            },
            build: {
                options: {
                    outputStyle: 'compressed',
                    compress: true
                },
                files: {
                    'css/styles.css' : ['src/less/app.less', 'src/less/base/bootstrap.less']
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.css'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['uglify:dev']
            },
            css: {
                files: ['src/less/*.less','src/less/**/*.less'],
                tasks: ['less:dev']
            },
            styles: {
                files: ['styles.css'],
                tasks: ['autoprefixer']
            }
        }
    });

    //Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Register task(s)
    grunt.registerTask('default', ['uglify:dev', 'less:dev', 'autoprefixer']);
    grunt.registerTask('build', ['uglify:build', 'less:build', 'autoprefixer']);

};