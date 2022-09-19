import inquirer from 'inquirer';
import sh from 'shelljs';
import chalk from 'chalk';

class GenComp {
  constructor() {
    this.ans = {};
    this.pipeline = [];
  }

  logStep() {
    let stepCount = 0;

    return (text) => {
      stepCount += 1;
      const pipelineLength = this.pipeline.length;
      return console.log(chalk.green.bold(`PROGRESS (${stepCount}/${pipelineLength}): ${text}`));
    };
  }

  async askMsg() {
    const ans = await inquirer.prompt([
      {
        type: 'input',
        name: 'compName',
        message: 'Enter component name(with kebab-case)',
      },
      {
        type: 'rawlist',
        name: 'group',
        message: 'Select group',
        choices: ['compForm', 'components', 'widgets', 'hooks'],
      },
    ]);

    this.ans = ans;
  }

  toCamel(name) {
    // 驗證格式對不對
    const regExp = /[^A-Za-z-]/;
    const isValidate = regExp.test(name);
    if (isValidate) {
      throw new Error('格式錯誤');
    }

    return name.replace(/-\w/g, (matchValue) => matchValue.slice(1).toUpperCase());
  }

  genFiles() {
    const log = this.logStep();

    const { compName, group } = this.ans;
    let upperCamelCaseCompName = this.toCamel(compName);
    const firstLetterToUpperCase = upperCamelCaseCompName.substr(0, 1).toUpperCase();
    upperCamelCaseCompName = firstLetterToUpperCase + upperCamelCaseCompName.substr(1);

    const genComponent = () => {
      log('generate component');
      sh.exec(`yarn plop:comp ${upperCamelCaseCompName}`);
    };

    const genView = () => {
      log('generate view page');
      sh.exec(`yarn plop:view ${group} ${upperCamelCaseCompName} ${compName}`);
    };

    this.pipeline.push(genComponent, genView);

    for (const fn of this.pipeline) {
      fn();
    }

    this.pipeline = [];
  }
}

const genComp = new GenComp();
genComp.askMsg().then(() => genComp.genFiles());
