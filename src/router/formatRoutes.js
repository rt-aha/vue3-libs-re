// convert camel case to kebab case
const kebabize = (str) => {
  return str
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}` : letter;
    })
    .join('');
};

const formatRoutes = (route) => {
  console.log(route);
  const name = kebabize(route.name);
  const withDynamic = /\[.*\]/.test(route.component);

  const routeConfig = {
    ...route,
    name,
    path: withDynamic ? route.name.toLowerCase() : `/${kebabize(route.name)}`,
  };

  if (route.name === 'Home') {
    routeConfig.path = '';
  }

  if (/\[.*\]/.test(route.component)) {
    const removeConnetSign = route.name.replace('-', '');
    // console.log('removeConnetSign', removeConnetSign);
    routeConfig.name = kebabize(removeConnetSign);
  }

  return routeConfig;
};

export default formatRoutes;
