import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../../graphql/Queries' 
import PostCard from "./PostCard"
import InfiniteScroll from 'react-infinite-scroll-component'
import Load from "../Load/Load"

function Posts(props) {
  const { loading, data, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { after: null, order: props.ordem }
  });

  const [posts, setPosts] = useState({});
  
  useEffect(() => {
    if(error) return;
    setPosts(data)
  }, [data, error])
  
  
  if(loading) {
    return (<Load />);
  }
  
  function fetchMoreData() {
    const { endCursor } = posts?.posts.pageInfo;
    fetchMore({
      variables: { after: endCursor },
      updateQuery: ( prevResult, { fetchMoreResult }) => {
        fetchMoreResult.posts.edges = [
          ...prevResult.posts.edges,
          ...fetchMoreResult.posts.edges
        ]
        return fetchMoreResult
      }
    });
  }
  
  return (
    <div>
      <InfiniteScroll dataLength={data.posts.edges.length} next={fetchMoreData} hasMore={data.posts.pageInfo.hasNextPage}>
        {
          posts?.posts?.edges.map( (edge, index) => {
            return (
              <PostCard key={index} edge={edge} />
            )
          })
        }
      </InfiniteScroll>
    </div>
  )
} 

export default Posts; 