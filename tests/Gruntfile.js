module.exports = function(grunt) {
    grunt.loadTasks('../tasks');
    grunt.task.loadNpmTasks('grunt-svgstore');
    grunt.task.loadNpmTasks('grunt-svgmin');

    var iconFiles = require('icons');

    // Project configuration.
    grunt.initConfig({
        shoppicon: {
            default: {
                files: [{
                    src: iconFiles,
                    dest: 'icon-sprite.svg'
                }]
            }
        }
    });

    grunt.registerTask('build_custom_sprite', ['shoppicon']);
};
