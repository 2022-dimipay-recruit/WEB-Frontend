import React from 'react';
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
  Components
} from '@/pages';
import { Screen } from '@/funtions/auth';
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
    <Routes>
      <Route path='/' element={<Screen Children={Main} />} />
      <Route path='/login' element={<Login />} />
      <Route path='/components' element={<Components />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </BrowserRouter>
    <ToastContainer />
  </>
);
