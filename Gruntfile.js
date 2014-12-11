module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var buildDir = 'dist';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        svgmin: {
            pre: {
                options: {
                    plugins: [
                        {removeViewBox: false},
                        {removeUselessStrokeAndFill: false}
                    ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'src/svg/*.svg',
                    dest: 'temp',
                    rename: function(dest, src) {
                        return dest + '/' + src.split(/[\\\/]/).pop().replace(/_/g, '-');
                    }
                }]
            },

            post: {
                options: {
                    plugins: [
                        {removeViewBox: false},
                        {removeUselessStrokeAndFill: false},
                        {removeTitle: true},
                        {cleanupIDs: false}
                    ]
                },
                files: [{
                    expand: true,
                    src: buildDir + '/**/*.svg'
                }]
            }
        },

        svgstore: {
            options: {},
            default: {
                files: [{
                    src: 'temp/*.svg',
                    dest: buildDir + '/svg/shoppicon.svg'
                }],
            },
        },

        clean: ['temp']
    });

    // Default task
    grunt.registerTask('default', ['svgmin:pre', 'svgstore', 'svgmin:post', 'clean']);
};
