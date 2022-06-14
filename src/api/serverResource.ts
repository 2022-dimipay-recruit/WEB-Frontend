import {
  LoginWithInfo,
  LoginWithToken,
  MyInfo,
} from './interfaces';

export interface APIResource {
  loginWithInfo: LoginWithInfo;
  loginWithToken: LoginWithToken;
  myInfo: MyInfo;
};