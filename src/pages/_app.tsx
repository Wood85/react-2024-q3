import type { AppProps } from 'next/app';
import './../index.css';
import { Provider } from 'react-redux';
import store from './../store/store';
import { useEffect, useContext } from 'react';
import ThemeProvider, { ThemeContext } from './../context/ThemeContext.tsx';

export default function App({ Component, pageProps }: AppProps) {
  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (localStorage.getItem('SW_theme')) {
      const theme = localStorage.getItem('SW_theme');
      if (theme !== null) {
        if (theme === 'dark') {
          toggleTheme();
        }
      }
    }
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
