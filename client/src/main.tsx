import { createRoot } from 'react-dom/client'
import App from './App'
import * as React from 'react';
import './index.css';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// const queryClient = new QueryClient();
// TypeScript type assertion to specify that the element exists
const rootElement = document.getElementById('root') as HTMLElement;
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
