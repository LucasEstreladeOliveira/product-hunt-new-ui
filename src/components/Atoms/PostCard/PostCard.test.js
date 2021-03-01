import { render } from '@testing-library/react';
import PostCard from './PostCard';

//Render test
test('Render Nav', () => {
  const edge = {
    cursor: "MQ==",
    node: {
      slug: "dev-apis",
      id: "286300",
      name: "DEV APIs",
      tagline: "Powerful APIs to help grow your business",
      description: "A complete APIs suite for your software development, and business to power-up. You don't have to go anywhere, single marketplace for all the APIs & third-party API integrations.",
      votesCount: 265,
      thumbnail: {
        url: "https://ph-files.imgix.net/a08178f3-fc51-4ff7-800a-7dcbc1e6818b.png?auto=format&fit=crop",
        __typename: "Media"
      },
      __typename: "Post"
    },
    __typename: "PostEdge"
  };

  const container = render(<PostCard edge={edge}/>);
  
  expect(container).toBeTruthy();
});