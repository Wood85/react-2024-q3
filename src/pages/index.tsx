import App from './../App';
import { Provider } from 'react-redux';
import store from './../store/store.ts';
import ThemeProvider from './../context/ThemeContext.tsx';
import Head from 'next/head';

export default function Page() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Head>
          <link rel="icon" type="image/png" href="/yoda.png" />
          <title>SW Search</title>
        </Head>
        <App />
      </ThemeProvider>
    </Provider>
  );
}
