'use strict';
var pkg = require('./package.json');

module.exports = function(grunt) {

  require('jit-grunt')(grunt);

  // Configurable paths
  var config = {
      source: 'app',
      dist: '_site',
      baseurl: ''
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

      // Project settings
      app: config,
      // Empties folders to start fresh
      clean: {
          dist: {
              files: [{
                  dot: true,
                  src: [
                      '.tmp',
                      '<%= app.dist %>/*',
                      '!<%= app.dist %>/.git*'
                  ]
              }]
          },
          server: '.tmp'
      },
      jekyll: {
            options: {
                config: '_config.yml,_config.build.yml',
                src: '<%= app.source %>'
            },
            dist: {
                options: {
                    dest: '<%= app.dist %>/<%= app.baseurl %>'
                }
            },
            server: {
                options: {
                    config: '_config.yml',
                    dest: '.jekyll/<%= app.baseurl %>'
                }
            }
        },
      buildcontrol: {
        options: {
          dir: '<%= config.dist %>',
          commit: true,
          push: true,
          message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        },
        pages: {
          options: {
            remote: 'git@github.com:martisak/martisak.github.io.git',
            branch: 'master'
          }
        },
        local: {
          options: {
            remote: '../',
            branch: 'build'
          }
        }
  }
  });

  grunt.registerTask('build', [
      'clean:dist',
      'jekyll:dist'
  ]);

  grunt.registerTask('default', [
      'build'
  ]);

};