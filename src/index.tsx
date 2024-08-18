import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page/error-page';
import Uncontroll from './routes/uncontroll/uncontroll';
import HookForm from './routes/hook-form/hook-form';
import { Provider } from 'react-redux';
import store from './store/store.ts';
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
