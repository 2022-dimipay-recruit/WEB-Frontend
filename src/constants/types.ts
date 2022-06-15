export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
};

export interface UserInfoType {
  questions: {
    received: number;
    accepted: number;
    rejected: number;
  };
  email: string;
  name: string;
  image: string;
  userName: string;
};

export type QuestionType = 'anonymous' | 'onymous';