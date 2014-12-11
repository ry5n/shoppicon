module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        svgmin: {
            options: {
                plugins: [
                    {removeViewBox: false},
                    {removeUselessStrokeAndFill: false}
                ]
            },
            dist: {
                files: [{
                    src: 'src/svg/*.svg',
                    dest: '_build/'
                }]
            }
        },

        svgstore: {
            options: {},
            default : {
                files: [{
                    src: '_build/*.svg',
                    dest: 'build/shoppicon.svg'
                }],
            },
        },

        clean: ['_build']
    });

    // Default task
    grunt.registerTask('default', ['svgmin']);
};
