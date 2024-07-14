import { useEffect } from 'react';
import './App.css';
import SearchPage from './views/SearchPage/SearchPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './views/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
]);

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem('SW_search_req')) {
      localStorage.setItem('SW_search_req', '');
    }
  }, []);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
