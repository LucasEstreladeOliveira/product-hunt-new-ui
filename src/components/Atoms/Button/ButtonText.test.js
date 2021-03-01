import { render } from '@testing-library/react';
import ButtonText from './ButtonText';

//Render test
test('Render button text', () => {
  const container = render(<ButtonText />);
  expect(container).toBeTruthy();
});

//Votes test
test('Render button with votes', () => {
    const { getByTestId } = render(<ButtonText votes={2}/>);
    const button = getByTestId("button_text");
    expect(button.innerHTML).toEqual("(2)");
});

//Voted test
test('Render voted button', () => {
    const { getByTestId } = render(<ButtonText voted={true}/>);
    const button = getByTestId("button_text");
    expect(button.className).toContain("voted");
});

//Label test
test('Render label button', () => {
    const { getByTestId } = render(<ButtonText label="Label_Button_Text"/>);
    const button = getByTestId("button_text");
    expect(button.innerHTML).toEqual("Label_Button_Text");
});

