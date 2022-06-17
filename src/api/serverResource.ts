import {
  Signup,
  LoginWithInfo,
  LoginWithRefreshToken,
  MyInfo,
  UserInfo,
  QuestionRegi,
  UserFind,
  QuestionList,
  QuestionAnswer,
  ImgUpload,
} from './interfaces';

export interface APIResource {
  signup: Signup,
  loginWithInfo: LoginWithInfo;
  loginWithRefreshToken: LoginWithRefreshToken;
  myInfo: MyInfo;
  userInfo: UserInfo;
  questionRegi: QuestionRegi;
  userFind: UserFind;
  questionList: QuestionList;
  questionAnswer: QuestionAnswer;
  imgUpload: ImgUpload;
};