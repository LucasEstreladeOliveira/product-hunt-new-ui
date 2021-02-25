import { gql } from '@apollo/client';

export const GET_POSTS = gql`
query posts( $after: String, $order: PostsOrder){ 
  posts(first: 10, order: $order, after: $after) {
    edges{
      cursor
      node{
        id
        name
        tagline
        description
        url
        votesCount
        commentsCount
        thumbnail{
          type
          url
        }
        website
        reviewsRating
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;