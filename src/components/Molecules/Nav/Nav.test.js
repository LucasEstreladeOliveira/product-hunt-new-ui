import { render } from '@testing-library/react';
import Nav from './Nav';

//Render test
test('Render Nav', () => {
  const tabs = [{name: "Route", route: `/`, selected: true}, {name: "Other route", route: `/other-route`, selected: false}];
  const container = render(<Nav tabs={tabs}/>);
  expect(container).toBeTruthy();
});