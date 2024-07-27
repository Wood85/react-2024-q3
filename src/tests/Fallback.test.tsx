import { render } from '@testing-library/react';
import Fallback from './../components/Fallback/Fallback';

const message = 'Oops!';

describe('Fallback', () => {
  test('renders the Fallback component', () => {
    render(<Fallback message={message} />);
  });
});
