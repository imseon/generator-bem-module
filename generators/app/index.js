'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var capitalize = require('capitalize');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the flawless ' + chalk.red('BemModule') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Please enter the module name: ',
      default: this.appname
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name
        }
      );
      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath('index.js'), {
          name: capitalize.words(this.props.name).replace(/\-/g, '')
        }
      );
      this.fs.copyTpl(
        this.templatePath('test.js'),
        this.destinationPath('test.js'), {
          name: capitalize.words(this.props.name).replace(/\-/g, '')
        }
      );
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function() {
    this.installDependencies({
      bower: false
    });
  }
});
