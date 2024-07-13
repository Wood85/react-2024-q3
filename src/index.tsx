import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorPage from './views/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App class="app" />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
