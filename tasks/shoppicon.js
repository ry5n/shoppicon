/*
 * Task shoppicon
 *
 * Builds a custom shoppicon SVG set and SVG sprite
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {
    // Change from the Gruntfile’s dir to the local shoppicon dir so that
    // loadNpmTasks finds the dependencies.
    var cwd = process.cwd();
    process.chdir(path.join(__dirname, '../'));

    // Load tasks from shoppicon’s dependencies.
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-svgmin');

    // Restore the working directory.
    process.chdir(cwd);

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
