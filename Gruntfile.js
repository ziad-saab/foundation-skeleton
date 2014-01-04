module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          baseUrl: "src/assets/js",
          mainConfigFile: "src/assets/js/app.js",
          dir: "dist/assets/js",
          skipDirOptimize: true,
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
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'src/',
        src: [
          '**',
          '!assets/config.rb',
          '!assets/.sass-cache/**',
          '!assets/css/**',
          '!assets/scss/**',
          '!assets/js/app.js',
          '!assets/js/vendors/**',
          'assets/js/vendors/foundation/vendor/custom.modernizr.js'
        ],
        dest: 'dist/'
      }
    },
    clean: {
      dist: ['dist'],
      rjs: ['dist/assets/js/vendors', 'dist/assets/js/build.txt']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('build', ['clean:dist', 'requirejs', 'clean:rjs', 'copy:dist', 'uglify', 'compass:dist']);
};
