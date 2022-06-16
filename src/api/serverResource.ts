import {
  LoginWithInfo,
  LoginWithRefreshToken,
  MyInfo,
  UserInfo,
  QuestionRegi,
  UserFind,
  QuestionList,
  QuestionAnswer,
} from './interfaces';

export interface APIResource {
  loginWithInfo: LoginWithInfo;
  loginWithRefreshToken: LoginWithRefreshToken;
  myInfo: MyInfo;
  userInfo: UserInfo;
  questionRegi: QuestionRegi;
  userFind: UserFind;
  questionList: QuestionList;
  questionAnswer: QuestionAnswer;
};