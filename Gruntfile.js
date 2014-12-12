module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean_ai_svg: {
            default: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/**/*.svg', '!src/template.ai.svg'],
                    dest: 'temp',
                    rename: function(dest, src) {
                        return dest + '/' + src.replace('.ai.svg', '.svg');
                    }
                }]
            }
        },

        svgstore: {
            build_sprite: {
                files: [{
                    src: 'temp/**/*.svg',
                    dest: 'svg-sprite/shoppicon.svg'
                }],
            },
        },

        svgmin: {
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

        clean: ['temp']
    });

    // Default task
    grunt.registerTask('default', [
        'clean_ai_svg',
        'svgstore',
        'svgmin',
        'clean'
    ]);
};
