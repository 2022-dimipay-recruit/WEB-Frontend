export interface ImgUpload {
  method: 'POST';
  endpoint: '/upload';
  req: FormData;
  res: {};
};