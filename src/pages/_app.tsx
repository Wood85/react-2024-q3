import type { AppProps } from 'next/app';
import './../index.css';
import { Provider } from 'react-redux';
import store from './../store/store';
import ThemeProvider from './../context/ThemeContext.tsx';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
