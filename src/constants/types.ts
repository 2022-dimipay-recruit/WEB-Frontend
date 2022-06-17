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
  following: number;
  follower: number;
};
export interface FindUser {
  id: string;
  email: string;
  userName: string;
  name: string;
  image: string;
};

export interface Question {
  id: string;
  question: string;
  answer: string;
  authorName: string | null;
  createAt: Date;
  likeCount: number;
  liked: boolean;
};

export type QuestionType = 'anonymous' | 'onymous';
export type QuestionStatus = 'accepted' | 'rejected';
export type PageType = 'acceptdQ' | 'sendQ' | 'rejectedQ' | 'receivedQ';

export const defaultProfile = `${import.meta.env.VITE_API_URI}/assets/defaultProfile.jpg`;
export const config = {
  defaultProfile: `/defaultProfile.jpg`,
};