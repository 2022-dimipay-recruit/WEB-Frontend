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
export interface myQuestion {
  id: string;
  createAt: Date;
  type: 'onymous' | 'anonymous';
  status: 'received' | 'rejected' | 'received';
  question: string;
  answer: string;
  liked: boolean;
  receiver: {
    userName: string;
    image: string;
    name: string;
  };
  likeCount: number;
};

interface FollowingFeed {
  follower: {
    userName: string;
    name: string;
    image: string;
  };
  following: {
    received: {
      id: string;
      createAt: Date;
      question: string;
      answer: string;
      authorName: string;
      likeCount: number;
      liked?: boolean;
    }[];
  };
};
interface RandomFeed {
  id: string;
  createAt: Date;
  question: string;
  answer: string;
  authorName: string;
  likeCount: number;
  liked?: boolean;
  receiver: {
      userName: string;
      name: string;
      image: string;
  };
};

export interface Feed {
  followingFeed?: Array<FollowingFeed>;
  randomFeed: Array<RandomFeed>;
};

export type QuestionType = 'anonymous' | 'onymous';
export type QuestionStatus = 'accepted' | 'rejected';
export type PageType = 'acceptdQ' | 'myQ' | 'rejectedQ' | 'receivedQ';

export const defaultProfile = `${import.meta.env.VITE_API_URI}/assets/defaultProfile.jpg`;
export const config = {
  defaultProfile: `/defaultProfile.jpg`,
};