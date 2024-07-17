import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test, describe } from 'vitest';
import SearchForm from './../components/SearchForm/SearchForm';
const updateData = vi.fn();

describe('SearchForm', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<SearchForm class="search-form" updateData={updateData} />}></Route>
        </Routes>
      </MemoryRouter>,
    );
  });
  test('should render SearchForm component', () => {
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  test('type into an input field', async () => {
    const user = userEvent.setup();

    const type = 'Hello, World!';

    const input = screen.getByTestId('input');

    await user.type(input, type);

    expect(input).toHaveValue(type);
  });
});
