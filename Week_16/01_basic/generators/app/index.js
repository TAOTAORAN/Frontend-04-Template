// yeoman基础知识
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        // Next, add your custom code
        // This method adds support for a `--babel` flag
        // this.option('babel'); 
    }

    method1() {
        // this.log 输出
        this.log('method 1 just ran');
    }
    
    // 收集用户输入
    // async prompting() {
    //     const answers = await this.prompt([
    //         {
    //         type: "input",
    //         name: "name",
    //         message: "Your project name",
    //         default: this.appname // Default to current folder name
    //         },
    //         {
    //         type: "confirm",
    //         name: "cool",
    //         message: "Would you like to enable the Cool feature?"
    //         }
    //     ]);

    //     this.log("app name", answers.name);
    //     this.log("cool feature", answers.cool);
    // }

    // Interacting with the file system
    method2() {
        this.fs.copyTpl(
            this.templatePath('t.html'),
            this.destinationPath('public/index.html'),
            { title: 'Templating with Yeoman' }
        );
    }

    // MANAGING DEPENDENCIES
    initPackages () {
        const pkgJson = {
            devDependencies: {
                eslint: '^3.15.0',
            }
        }
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall();
    }
};