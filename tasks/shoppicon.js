/*
 * Task shoppicon
 *
 * Builds a custom shoppicon SVG set and SVG sprite
 */

'use strict';

module.exports = function(grunt) {
    grunt.task.loadNpmTasks('grunt-svgstore');
    grunt.task.loadNpmTasks('grunt-svgmin');

    grunt.registerMultiTask('shoppicon', 'TODO Description', function() {
        grunt.config.merge({
            svgstore: {
                shoppicon: {
                    files: this.files,
                },
            },
            svgmin: {
                shoppicon: {
                    options: {
                        plugins: [
                            {removeTitle: true},
                            {cleanupIDs: false}
                        ]
                    },
                    files: [{
                        expand: true,
                        src: this.files.map(function(f) {
                            return f.dest;
                        })
                    }]
                }
            }
        });

        grunt.task.run(['svgstore:shoppicon', 'svgmin:shoppicon']);
    });
};
