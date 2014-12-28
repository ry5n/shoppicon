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
                    ext: '.svg'
                }]
            },
        },

        svgstore: {
            default: {
                files: [{
                    src: 'svg/**/*.svg',
                    dest: 'svg-sprite/shoppicon.svg'
                }],
            },
        },

        svgmin: {
            post_make_svg: {
                files: [{
                    expand: true,
                    src: 'svg/**/*.svg'
                }]
            },

            post_svgstore: {
                options: {
                    plugins: [
                        {removeTitle: true},
                        {cleanupIDs: false}
                    ]
                },
                files: [{
                    expand: true,
                    src: 'svg-sprite/shoppicon.svg'
                }]
            },
        }
    });

    // Default task
    grunt.registerTask('default', [
        'make_svg',
        'svgmin:post_make_svg',
        'svgstore',
        'svgmin:post_svgstore',
    ]);
};
