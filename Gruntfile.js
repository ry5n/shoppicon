module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks-private');
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
                    rename: function(dest, src) {
                        return dest + '/' + src.replace('.ai.svg', '.svg');
                    }
                }]
            },
        },

        svgmin: {
            default: {
                files: [{
                    expand: true,
                    src: 'svg/**/*.svg'
                }]
            },
        },

        shoppicon: {
            svg_sprite: {
                files: [{
                    src: 'svg/**/*.svg',
                    dest: 'svg-sprite/shoppicon.svg'
                }],
            },
        },
    });

    // Default task
    grunt.registerTask('default', [
        'make_svg',
        'svgmin',
        'shoppicon:svg_sprite'
    ]);
};
