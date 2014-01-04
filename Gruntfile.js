module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          appDir: "src/",
          baseUrl: "assets/js",
          mainConfigFile: "src/assets/js/app.js",
          dir: "dist",
          skipDirOptimize: true,
          optimizeCss: "none",
          name: "app",
          uglify: {
            no_mangle: false
          }
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/assets/js/vendors/requirejs/require.js': 'src/assets/js/vendors/requirejs/require.js'
        }
      }
    },
    compass: {
      dist: {
        options: {
          config: 'src/assets/config.rb',
          outputStyle: 'compressed',
          cssDir: 'dist/assets/css',
          sassDir: 'src/assets/scss'
        }
      },
      dev: {
        options: {
          basePath: 'src/assets',
          watch: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  
  grunt.registerTask('build', ['requirejs', 'uglify', 'compass:dist']);
};