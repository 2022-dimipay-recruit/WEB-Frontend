export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
};

export interface UserInfo {
  questions: {
    received: number;
    accepted: number;
    rejected: number;
  };
  email: string;
  name: string;
  profile: string;
  userName: string;
};