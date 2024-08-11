import { render } from '@testing-library/react';
import Fallback from './../components/Fallback/Fallback';
import { describe, test } from 'vitest';

const message = 'Oops!';

describe('Fallback', () => {
  test('renders the Fallback component', () => {
    render(<Fallback message={message} />);
  });
});
