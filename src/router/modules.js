import confStore from '../paramsStore/confStore';

const modules = {};
const refrence = (routes) => {
  const deepLoop = (rts) => {
    rts.forEach((route) => {
      route.compMatch = route.component;
      try {
        modules[route.component] = require(`pages/${route.component}/index`);
      } catch (error) {
        modules[route.component] = require(`pages/${route.component}`);
      }
      if (modules[route.component].default) {
        modules[route.component] = modules[route.component].default;
      }
      if (route.childRoutes) {
        deepLoop(route.childRoutes);
      }
    });
  };
  deepLoop(routes);
  return routes;
};
const routerConfig = confStore();
refrence(routerConfig.routes);

export { routerConfig as default, modules };
