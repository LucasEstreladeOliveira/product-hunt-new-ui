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
    topics(first: 3){
      edges{
        node{
          name
        }
      }
    }
    votesCount
    media{
      url
    }
    description
  }
}
`;


// const searchTopic = gql`
// query SearchPostsQuery($featured:Boolean$first:Int$postedDate:String$query:String$topicNames:[String!]$year:Int){
//   topics(query:$query first:3){
//     edges{
//       node{
//         id 
//         name 
//         description 
//         slug 
//         ...TopicImage 
//         __typename
//       }
//       __typename
//     }
//     __typename
//   }
// }
// `
