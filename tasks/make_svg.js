/*
 * Task make_svg
 *
 * Takes SVG files saved from Adobe Illustrator with “Preserve Illustrator
 * Editing Capabilities” and cleans them, preserving *only* the layer with id
 * “exports”.
 *
 * Copyright (c) 2014 Ryan L. Frederick
 * Licensed under the MIT license.
 */

'use strict';

var cheerio = require('cheerio');

module.exports = function(grunt) {
  grunt.registerMultiTask(
    'make_svg',
    'Extract Exports from Illustrator-editable SVG.',
    function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Get the source files. The "nonull" option is used to retain invalid
      // files/patterns so they can be warned about.
      var files = grunt.file.expand({nonull: true}, f.src);

      files.forEach(function(filepath) {
        // Warn if a source file/pattern was invalid.
        if (!grunt.file.exists(filepath)) {
          grunt.log.error('Source file "' + filepath + '" not found.');
          return '';
        }

        // Read the source file and parse as XML using Cheerio.
        // TODO There should probably be some error handling here.
        var contents = grunt.file.read(filepath);
        var $src = cheerio.load(contents, {
          normalizeWhitespace: true,
          xmlMode: true
        });
        var $dest = cheerio.load(
          '<svg xmlns="http://www.w3.org/2000/svg" />', {
            xmlMode: true
          }
        );
        var $srcRoot = $src('svg');
        var $destRoot = $dest('svg');
        var $exports = $srcRoot.find('#exports');

        $destRoot.attr('viewBox', $srcRoot.attr('viewBox'));
        $destRoot.append($exports);

        // Write the destination file.
        grunt.file.write(f.dest, $dest.xml());

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" created.');
      });
    });
  });

};
