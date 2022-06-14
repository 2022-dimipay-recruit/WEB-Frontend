import {
  LoginWithInfo,
  LoginWithRefreshToken,
  MyInfo,
} from './interfaces';

export interface APIResource {
  loginWithInfo: LoginWithInfo;
  loginWithRefreshToken: LoginWithRefreshToken;
  myInfo: MyInfo;
};