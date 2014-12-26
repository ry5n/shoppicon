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
                    rename: function(dest, src) {
                        return dest + '/' + src.replace('.ai.svg', '.svg');
                    }
                }]
            }
        },

        svgstore: {
            build_sprite: {
                files: [{
                    src: 'svg/**/*.svg',
                    dest: 'svg-sprite/shoppicon.svg'
                }],
            },
        },

        svgmin: {
            clean_svg: {
                files: [{
                    expand: true,
                    src: 'svg/**/*.svg'
                }]
            },
            clean_sprite: {
                options: {
                    plugins: [
                        {removeTitle: true},
                        {cleanupIDs: false}
                    ]
                },
                files: [{
                    expand: true,
                    src: 'svg-sprite/**/*.svg'
                }]
            }
        },

        shoppicon: {
            default: {
                files: [{
                    src: 'svg/**/*.svg',
                    dest: 'test/icon-sprite.svg'
                }]
            }
        }
    });

    // Default task
    grunt.registerTask('default', [
        'make_svg',
        'svgmin:clean_svg',
        'svgstore',
        'svgmin:clean_sprite'
    ]);

    grunt.registerTask('shoppicon', ['shoppicon']);
};
