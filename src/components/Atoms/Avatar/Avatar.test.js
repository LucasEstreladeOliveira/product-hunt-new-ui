import { render } from '@testing-library/react';
import Avatar from './Avatar';
import user from "../../../assets/avatar.jpg"

//Render test
test('Render avatar', () => {
  const container = render(<Avatar />);
  expect(container).toBeTruthy();
});

test('Render avatar source', () => {
  const { getByAltText } = render(<Avatar src={user} alt="avatar"/>);
  const avatar = getByAltText("avatar");
  expect(avatar.src).toContain("avatar.jpg");
});
