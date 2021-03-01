import { render } from '@testing-library/react';
import Button from './Button';

//Render test
test('Render button', () => {
  const container = render(<Button />);
  expect(container).toBeTruthy();
});

//Votes test
test('Render button with votes', () => {
    const { getByTestId } = render(<Button votes={2}/>);
    const button = getByTestId("votes");
    expect(button.innerHTML).toEqual("2");
});

//Voted test
test('Render voted button', () => {
  const { getByTestId } = render(<Button voted={true}/>);
  const button = getByTestId("button");
  expect(button.className).toContain("voted");
});

