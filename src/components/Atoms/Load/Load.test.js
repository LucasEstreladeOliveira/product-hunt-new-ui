import { render } from '@testing-library/react';
import Load from './Load';

//Render test
test('Render load', () => {
  const container = render(<Load />);
  expect(container).toBeTruthy();
});
