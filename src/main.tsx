import ReactDOM from 'react-dom/client';
import '@assets/styles/index.scss';
import { Toaster } from 'sonner';
import React from 'react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <App />
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          className: '!w-fit !py-4 !whitespace-nowrap !px-8 !rounded-[32px]',
        }}
      />
    </>
  </React.StrictMode>
);
