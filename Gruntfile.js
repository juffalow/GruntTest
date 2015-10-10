// main function
module.exports = function(grunt) {

  // configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: { // plugin, which is concatenating files
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/*.js'], // the input are all .js files in src directory
        dest: 'src/temp/<%= pkg.name %>.js' // output is one file named like the project ( defined in file package.json -> name )
      }
    },
    uglify: { // plugin, which minify files
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= concat.dist.dest %>', // the input is the output file from concat plugin
        dest: 'www/js/<%= pkg.name %>.min.js' // output is minify file in production directory
      }
    },
    clean: ["src/temp/"]
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // default task
  // plugins are executed in the order they are defined here
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('cleanup', ['clean']);

};