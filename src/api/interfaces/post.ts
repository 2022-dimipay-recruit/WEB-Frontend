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