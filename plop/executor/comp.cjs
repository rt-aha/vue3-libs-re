module.exports = function (plop) {
  // controller generator
  plop.setGenerator('comp', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/components/Re{{name}}.vue',
        templateFile: '../component.hbs',
      },
    ],
  });
};
