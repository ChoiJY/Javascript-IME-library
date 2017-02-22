/**
 * Created by jychoi on 2017. 2. 9..
 */
module.exports = function(grunt) {
    grunt.initConfig({
        jshint:{
            files: ['/js/jquery.securekeyboard.js', 'Gruntfile.js'],
            options: {
                globals:{
                    jQuery: true
                }
            }
        },
        qunit:{
            files: ['testDoc.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('travis',['jshint', 'qunit']);
};