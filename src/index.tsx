import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page/error-page';
import Uncontroll from './routes/uncontroll/uncontroll';
import HookForm from './routes/hook-form/hook-form';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'uncontroll',
    element: <Uncontroll />,
  },
  {
    path: 'hook-form',
    element: <HookForm />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
