module.exports	=	function( grunt )	{
	
	grunt.initConfig({
		eslint:	{
			target:	['src/*.js']
		},
		babel: {
			options: {
				presets: ['env']
			},
			dist: {
				files: {
					'dist/contentEditableCaret.js':	'src/contentEditableCaret.js'
				}
			}
		},
		uglify:	{
			my_target: {
				files: {
					'dist/contentEditableCaret.min.js':	['dist/contentEditableCaret.js']
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['eslint', 'babel', 'uglify']);
	
};