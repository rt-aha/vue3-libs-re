const home = {
  path: '',
  name: 'home',
  component: () => import(/* webpackChunkName: "AboutUs" */ '@/views/Home.vue'),
};

const pages = [
  {
    path: 'test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/Test.vue'),
  },
];

const allPages = [home, ...pages];

export default allPages;
export { pages };
