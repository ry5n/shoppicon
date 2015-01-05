module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        make_svg: {
            default: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/**/*.svg', '!src/template.ai.svg'],
                    dest: 'svg',
                    ext: '.svg'
                }]
            },
        },

        svgmin: {
            default: {
                files: [{
                    expand: true,
                    src: 'svg/**/*.svg'
                }]
            }
        },

        iconpack: {
            default: {
                options: {
                    svgPrefix: '<%= pkg.name %>-'
                },
                src: 'svg/**/*.svg',
                dest: 'svg-sprite/<%= pkg.name %>.svg'
            }
        }
    });

    // Default task
    grunt.registerTask('default', ['make_svg', 'svgmin', 'iconpack']);
};
