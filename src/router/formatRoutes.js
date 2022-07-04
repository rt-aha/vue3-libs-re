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
  const name = kebabize(route.name);

  const routeConfig = {
    ...route,
    name,
    path: `/${kebabize(route.name)}`,
  };

  if (route.name === 'Home') {
    routeConfig.path = '';
  }

  return routeConfig;
};

export default formatRoutes;
