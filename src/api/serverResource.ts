import {
  Signup,
  LoginWithInfo,
  LoginWithRefreshToken,
  MyInfo,
  UserInfo,
  QuestionRegi,
  QuestionReject,
  UserFind,
  QuestionList,
  MyQuestionList,
  QuestionAnswer,
  ImgUpload,
  QuestionLike,
  GetFollowList,
  Follow,
  GetFeed,
} from './interfaces';

export interface APIResource {
  signup: Signup,
  loginWithInfo: LoginWithInfo;
  loginWithRefreshToken: LoginWithRefreshToken;
  myInfo: MyInfo;
  userInfo: UserInfo;
  questionRegi: QuestionRegi;
  questionReject: QuestionReject;
  userFind: UserFind;
  questionList: QuestionList;
  myQuestionList: MyQuestionList;
  questionAnswer: QuestionAnswer;
  imgUpload: ImgUpload;
  questionLike: QuestionLike;
  getFollowList: GetFollowList;
  follow: Follow;
  getFeed: GetFeed;
};