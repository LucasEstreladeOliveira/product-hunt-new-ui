import { useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../../../graphql/Queries' 
import PostCard from "../../Atoms/PostCard/PostCard"
import InfiniteScroll from 'react-infinite-scroll-component'
import Load from "../../Atoms/Load/Load"
import { usePosts } from "../../../providers/posts"

function Posts(props) {

  //Deconstruct setVotedPosts function from context
  const { votedPosts, setVotedPosts, postedBefore, topic } = usePosts();

  //Fetch the data
  const { loading, data, error, fetchMore, refetch } = useQuery(GET_POSTS, {
    variables: { after: null, order: props.ordem, postedBefore: postedBefore, topic: topic }
  });
  
  //Helper to filter array of objects 
  const uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
  
  //Map the data fetched and create an array to set voted posts
  useEffect(() => {
    let newVotedPosts = data?.posts?.edges?.map( edge => {
      return {
        id: edge.node.slug,
        isVoted: false,
        votes: edge.node.votesCount
      }
    })
    if(!newVotedPosts) return;
    
    let filteredPosts = uniqueArray([...newVotedPosts, ...votedPosts])

    setVotedPosts(filteredPosts)
    // eslint-disable-next-line
  }, [data, setVotedPosts])

  //Update postedBefore from context and refetch based on the date
  useEffect(() => {
    refetch({
      variables: { postedBefore: postedBefore },
    })
  }, [postedBefore, refetch])

  //Update topic from context and refetch based on the topic
  useEffect(() => {
    refetch({
      variables: { topic: topic },
    })
  }, [topic, refetch])

  //Return loading while data is not fetched
  if(loading) {
    return (<Load />);
  }

  //Return error in case of error
  if(error) {
    return (<div>Error</div>);
  }
  
  //Fetch more data from API on the end of the page
  function fetchMoreData() {
    const { endCursor } = data?.posts.pageInfo;
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
  
  //Render list of posts
  return (
    <div>
      <InfiniteScroll dataLength={data.posts.edges.length} next={fetchMoreData} hasMore={data.posts.pageInfo.hasNextPage}>
        {
          data?.posts?.edges.map( (edge, index) => {
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