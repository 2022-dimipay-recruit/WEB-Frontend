import { getAccessToken, refetchToken } from '@/api';
import { Navigate } from 'react-router-dom';
import { LoadableComponent } from '@loadable/component';

export const checkAuth = async (Component: LoadableComponent<{}>) => {
  try {
    const accessToken = getAccessToken();
    if(!accessToken) throw new Error('Cannot find access token');
    
    if(!(await refetchToken())) throw new Error('Cannot login with token');
    return <Component />;
  } catch {
    return <Navigate to='/login' />;
  }
};