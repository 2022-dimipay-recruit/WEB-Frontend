import loadable from '@loadable/component';

export const Main = loadable(() => import('./Main'));
export const Login = loadable(() => import('./Login'));
export const Signup = loadable(() => import('./Signup'));

export const Components = loadable(() => import('./Components'));