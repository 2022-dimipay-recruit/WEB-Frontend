import { toast } from 'react-toastify';

export default {
  error(message: string | JSX.Element) {
    toast(message, {type: 'error'});
  },
  success(message: string | JSX.Element) {
    toast(message, {type: 'success'});
  },
};