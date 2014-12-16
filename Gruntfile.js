/*jshint node: true*/

module.exports = function(grunt) {

    var buildConfig = {
        compressJS: true
    };

    grunt.initConfig({
        clean: {
            dist: ['dist/'],
            plainizeEnd: ['dist/plainize']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },
        combo: {
            plainize: {
                options: {
                    exportsAsLib: {
                        initModule: 'plainize/plainize',
                        exportsName: 'plainize'
                    }
                },
                expand: true,
                cwd: 'src/',
                src: 'plainize/plainize.js',
                dest: './dist/',
                ext: '.combo.js'
            }
        },
        concat: {
            plainizeFakeUglify: {
                files: {
                    'dist/plainize.js': [
                        'dist/plainize/plainize.combo.js'
                    ]
                }
            }
        },
        uglify: {
            plainize: {
                files: {
                    'dist/plainize.js': [
                        'dist/plainize/plainize.combo.js'
                    ]
                }
            },

        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cmd-combo2');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('hint', ['jshint']);

    grunt.registerTask('default', [
            'hint',
            'clean:dist',
            'combo:plainize',
            buildConfig.compressJS ?
                'uglify:plainize' : 'concat:plainizeFakeUglify',
            'clean:plainizeEnd'
        ]);

};
