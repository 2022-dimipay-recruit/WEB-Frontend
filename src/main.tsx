import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { globalCss } from '#/stitches.config';
import {
  Main,
  Login,
  Components,
  Signup,
  SignupImg,
  User,
  Feed,
  Loading,
} from '@/pages';
import { Screen, ExceptionPage } from '@/funtions';
import { RecoilRoot } from 'recoil';

import '@/assets/Pretendard/index.css';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

globalCss({
  ':root': {
    fontSize: '10px'
  },
  '*': {
    fontFamily: 'Pretendard',
    fontSize: '1.6rem',
    boxSizing: 'border-box',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  p: {
    margin: 0,
  },
  body: {
    backgroundColor: '$background',
    margin: 0,
  },
})();

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Screen Children={Main} />} />
        <Route path='/login' element={<ExceptionPage Children={Login} />} />
        <Route path='/signup' element={<ExceptionPage Children={Signup} />} />
        <Route path='/imgUpload' element={<ExceptionPage Children={SignupImg} needAuth />} />
        <Route path='/components' element={<Components />} />
        <Route path='/feed' element={<Screen Children={Feed} />} />
        <Route path='/:username' element={<Screen Children={User} />} />
      </Routes>
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
