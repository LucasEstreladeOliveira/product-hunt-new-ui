import { gql } from '@apollo/client';

export const GET_POSTS = gql`
query posts( $after: String, $order: PostsOrder){ 
  posts(first: 10, order: $order, after: $after) {
    edges{
      cursor
      node{
        slug
        id
        name
        tagline
        description
        votesCount
        thumbnail{
          url
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;


export const GET_POST = gql`
query post( $slug: String){ 
  post(slug: $slug) {
    name		
    tagline
    thumbnail {
      url
    }	
  }
}
`;