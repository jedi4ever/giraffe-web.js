module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    aws: grunt.file.readJSON('s3.json'),
    pkg: grunt.file.readJSON('package.json'),

    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read',
        region: 'eu-west-1'
      }, dist: {
        upload: [ {
          src: 'dist/*',
          dest: ''
        }
        ]
      }
    },
    bashpack: {
      startScript: 'bin/giraffe-web',
      darwin: {
        options: {
          outputFile: 'dist/giraffe-web-darwin-x64.run',
          nodePlatform: 'darwin',
          nodeVersion: 'latest'
        }
      },
      linux: {
        options: {
          outputFile: 'dist/giraffe-web-linux-x64.run',
          nodePlatform: 'linux',
          nodeVersion: 'latest'
        }
      }
    },
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
        options: {
          targetDir: 'vendor',
          cleanup: true
        }
      }
    },
    jshint: {
      // define the files to lint

      web: {
        files: {
          //src: ['public/js/*.js']
        },
        options: {
          browser: true,
          devel: true,
          strict: true,
          jquery: true,
          unused: true,
          trailing: true,
          undef: true
        }
      },
      lib: {
        files: {
          src: ['lib/**/*.js']
        },
        options: {
          node: true,
          curly: true,
          quotmark: 'single',
          //unused: true,
          trailing: true,
          strict: true,
          undef: true
        }
      },
      test: {
        files: {
          src: ['test/**/*.js']
        },
        options: {
          node: true,
          curly: true,
          quotmark: 'single',
          undef: false,
          trailing: true,
          //strict: true
        }
      },
      gruntfile: {
        files: {
          src: ['Gruntfile.js']
        }
      },
    },
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'list',
          require: 'coverage/blanket'
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          // use the quiet flag to suppress the mocha console output
          quiet: true
        },
        src: ['test/**/*.js'],
        // specify a destination file to capture the mocha
        // output (the quiet option does not suppress this)
        dest: 'coverage.html'
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js' ,
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: ['lib/**/*.js','bin/*','test/**/*.js'],
        tasks: ['test']
      },
      web: {
        files: ['public/js/*.js'],
        tasks: ['test']
      },
      options: {
        nospawn: false
      }
    },
    htmllint: {
      all: ["public/index.html"]
    },

    clean: {
      docs: ['docs/']
    },

    jsdoc: {
      src: ['lib/**/*.js',
        'README.md'],
        options: {
          configure: '.jsdocrc',
          destination: 'docs'
        }
    },

    readme_generator: {
      documentation: {
        options: {
          // Task-specific options go here.
          // detailed explanation is under options
          // Default options:
          readme_folder: "readme",
          output: "README.md",
          table_of_contents: true,
          toc_extra_links: [],
          generate_changelog: false,
          changelog_folder: "changelogs",
          changelog_version_prefix: 'v',
          changelog_insert_before: null,
          banner: null,
          has_travis: false,
          github_username: "jedi4ever",
          travis_branch: "master",
          generate_footer: false,
          generate_title: true,
          package_title: null,
          package_name: null,
          package_desc: null,
          informative: true,
          h1: "#",
          h2: "##",
          back_to_top_custom: null
        },
        order: {
          "intro.md": "Introduction",
          "installation.md": "Installation",
          "usage.md": "Usage",
          "configuration.md": "Configuration",
          "building-and-testing.md": "Building and Testing",
          "license.md": "License"
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'docs',
        repo: 'git@github.com:jedi4ever/giraffe-web.js.git'
      },
      src: [ '**' ] // All files in the docs
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-readme-generator');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-bashpack');

  grunt.registerTask('readme', ['readme_generator']);
  grunt.registerTask('docs', ['clean', 'readme_generator', 'jsdoc']);

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('test', ['jshint','mochaTest']);


  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};
