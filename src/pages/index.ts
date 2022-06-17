import loadable from '@loadable/component';

export const Main = loadable(() => import('./Main'));
export const Login = loadable(() => import('./Login'));
export const Signup = loadable(() => import('./Signup'));
export const SignupImg = loadable(() => import('./Signup/Image'));

export const User = loadable(() => import('./User'));

export const Components = loadable(() => import('./Components'));