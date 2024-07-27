import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store/store.ts';
import ThemeProvider from './context/ThemeContext.tsx';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>,
);
