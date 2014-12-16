/*jshint node: true*/

module.exports = function(grunt) {

    grunt.initConfig({
        clean: {
            dist: ['dist/']
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
                        initModule: 'plainize/plainize.js',
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
        uglify: {
            plainize: {
                files: {
                    'dist/plainize.js': [
                        'dist/plainize.combo.js'
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
            'combo:plainize',
            'uglify:plainize'
        ]);

};
