import { QuestionType } from '@/constants/types';

export interface QuestionRegi {
  method: 'POST';
  endpoint: '/post/question';
  req: {
    receiver: string;
    post: string;
    type: QuestionType;
  };
  res: {
    id: number;
  };
};

export interface QuestionAnswer {
  method: 'POST';
  endpoint: '/post/answer';
  req: {
    questionId: string;
    post: string;
  };
  res: {};
};
export interface QuestionReject {
  method: 'PATCH' | 'DELETE';
  endpoint: '/post/question';
  req: {
    questionId: string;
  };
  res: {};
};

export interface QuestionLike {
  method: 'POST';
  endpoint: '/post/like';
  req: {
    questionId: string;
  };
  res: {};
};