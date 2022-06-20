import loadable from '@loadable/component';

export const Main = loadable(() => import('./Main'));
export const Feed = loadable(() => import('./Feed'));
export const Login = loadable(() => import('./Login'));
export const Signup = loadable(() => import('./Signup'));
export const SignupImg = loadable(() => import('./Signup/Image'));

export const User = loadable(() => import('./User'));

export const Loading = loadable(() => import('./Loading'));