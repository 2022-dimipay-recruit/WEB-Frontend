import { Notification } from '@/constants/types';

export interface GetNotification {
  method: 'GET';
  endpoint: '/notification';
  req: {};
  res: Array<Notification>;
};