import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../../graphql/Queries' 
import Button from "../Button/Button"
import PostCard from "./PostCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import InfiniteScroll from 'react-infinite-scroll-component'

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
    return "Loading...";
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
              <PostCard key={index}>
                <div className="conten-wrapper">
                  <div className="content-thumb">
                    <img src={edge.node.thumbnail.url} alt="thumbnail"></img>
                  </div>
                  <div className="content">
                    <div className="content-title">{edge.node.name}</div>
                    <div className="content-tagline">{edge.node.tagline}</div>
                  </div>
                  
                </div>
                <Button>
                  <div className="button-wrapper">
                    <div className="icon-wrapper">
                      <FontAwesomeIcon icon="caret-up"></FontAwesomeIcon>
                    </div>
                    <div className="votes">
                      {edge.node.votesCount}
                    </div>
                  </div>
                </Button>
              </PostCard>
            )
          })
        }
      </InfiniteScroll>
    </div>
  )
} 

export default Posts; 