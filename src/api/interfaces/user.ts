import { FindUser, Question, UserInfoType } from '@/constants/types';

export interface MyInfo {
  method: 'GET';
  endpoint: '/user/me';
  req: {};
  res: UserInfoType;
};
export interface UserInfo {
  method: 'GET';
  endpoint: '/user';
  req: {};
  res: UserInfoType;
};
export interface UserFind {
  method: 'GET';
  endpoint: '/user/find';
  req: {};
  res: FindUser[];
};

export interface QuestionList {
  method: 'GET';
  endpoint: '/user/list';
  req: {};
  res: {
    question: Question[];
    maxPage: number;
  };
};

export interface GetFollowList {
  method: 'GET';
  endpoint: '/user/follow/list';
  req: {};
  res: {
    list: string[];
    next: number | null;
  };
};
export interface Follow {
  method: 'POST';
  endpoint: '/user/follow';
  req: {
    followName: string;
  };
  res: {};
};