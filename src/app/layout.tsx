'use client';
// import type { Metadata } from 'next';
import './globals.css';
import { Provider } from 'react-redux';
import store from './../store/store';
import ThemeProvider, { ThemeContext } from './../context/ThemeContext';
import { useContext } from 'react';

// export const metadata: Metadata = {
//   title: 'SW Search',
//   description: 'Search the characters of the Star Wars',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? 'darkTheme' : 'lightTheme';
  return (
    <html lang="en">
      <Provider store={store}>
        <ThemeProvider>
          <body className={theme}>{children}</body>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
