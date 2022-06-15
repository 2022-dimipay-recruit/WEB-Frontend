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
  facebook: string | null;
  instagram: string | null;
};

export type QuestionType = 'anonymous' | 'onymous';