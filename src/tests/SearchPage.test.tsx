import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, it, describe } from 'vitest';
import SearchPage from './../views/SearchPage/SearchPage';
import ErrorPage from './../views/ErrorPage/ErrorPage';

describe('SearchPage', () => {
  it('should render ErrorPage for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Routes>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="/search/:page" element={<SearchPage />}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('This is not the page you are looking for')).toBeInTheDocument();
  });
});
