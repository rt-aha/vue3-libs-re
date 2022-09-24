module.exports = function (plop) {
  // controller generator
  plop.setGenerator('comp', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'folder',
        message: 'view folder',
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name',
      },
      {
        type: 'input',
        name: 'kebabName',
        message: 'kebab name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/components/{{folder}}/Re{{name}}.vue',
        templateFile: '../component.hbs',
      },
    ],
  });
};
