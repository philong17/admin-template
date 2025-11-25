import MantineProvider from '@/providers/MantineProvider.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ReactQueryProvider from './providers/ReactQueryProvider.tsx';
// Configure dayjs with Vietnam timezone
import './config/dayjs';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </ReactQueryProvider>
    ,
  </StrictMode>,
);
