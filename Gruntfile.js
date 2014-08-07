module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      jsx_watch: './node_modules/.bin/jsx -x jsx --watch src/assets/jsx src/assets/js/jsx',
      jsx_compile: './node_modules/.bin/jsx -x jsx --no-cache-dir src/assets/jsx dist/assets/js/jsx'
    },
    concurrent: {
      dev: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['compass:dev', 'exec:jsx_watch']
      }
    },
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
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('install', ['exec:npm_install', 'exec:bower_install']);
  grunt.registerTask('dev', ['concurrent:dev']);
  grunt.registerTask('build', ['clean:dist', 'requirejs', 'clean:rjs', 'copy:dist', 'exec:jsx_compile', 'uglify', 'compass:dist']);
};
