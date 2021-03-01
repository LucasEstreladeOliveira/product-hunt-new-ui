import styled from "styled-components"
import { useEffect, useState } from 'react';
import Button from "../Button/Button"
import { useHistory } from "react-router-dom"
import { usePosts } from "../../../providers/posts"

//PostCard styled
const StyledPostCard = styled.div`
    display: -webkit-box;
    margin: 10px;
    margin-right: 20px; 
    color: #3c434e;
    background-color: #ffffff;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px;
    align-items: center;

    .content-thumb img {
        width: 40px;
        height: 40px;
        border-radius: 8px;
    }
    .conten-wrapper {
        display: flex;
        width: Calc(100% - 85px);
    }
    .content {
        margin-left: 10px;
        width: 100%;
        align-items: center;
    }
    .content-title {
        font-family: "Raleway", Raleway;
        font-weight: bold;
    }
    .content-tagline {
        font-family: "Raleway", Raleway;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #a2adb2;
        
    }
    .voted {
      border: 1px solid #d9552d !important;
      background-color: #d9552d !important;
    }

    .voted .button-wrapper {
      color: #ffffff !important
    }
`
function PostCard(props) {

  //Get the edge from prop
  const [edge, setEdge] = useState(props.edge);

  //Get voted posts from context
  const { votedPosts, setVotedPosts } = usePosts();
  
  //Create states to manage upvote logic
  const [voted, setVoted ] = useState(false);
  const [votes, setVotes ] = useState(0);

  //Handle route when post card is clicked
  let history = useHistory();
  
  //Update post edge
  useEffect(() => {
    setEdge(props.edge)
  }, [props.edge])

  //Update upvote data
  useEffect(() => {
    votedPosts?.forEach(post => {
      if(post.id === edge.node.slug ){
        setVoted(post.isVoted);
        setVotes(post.votes)
      }
    })
  }, [votedPosts, edge])

  //Redirect to detail page when post card is clicked
  function pushToPostDetail(slug) {
    return (
      history.push({
        pathname: "/post_detail",
        state: {
          slug
        }
      })
    )
  }
  
  //Function to handle upvote
  function vote() {
    let newVotedPosts = votedPosts.map(votedPost => {
      if(edge.node.slug === votedPost.id) {
        if(votedPost.isVoted) {
          votedPost.isVoted = false;
          votedPost.votes -= 1;
        }else {
          votedPost.isVoted = true;
          votedPost.votes += 1;
        }
      }
      return votedPost
    })
    setVotedPosts(newVotedPosts)
  }

  //Render styled post card
  return( 
    <StyledPostCard>
      <div className="conten-wrapper" onClick={() => {
        pushToPostDetail(edge.node.slug);
      }}>
        <div className="content-thumb">
          <img src={edge.node.thumbnail.url} alt="thumbnail"></img>
        </div>
        <div className="content">
          <div className="content-title">{edge.node.name}</div>
          <div className="content-tagline">{edge.node.tagline}</div>
        </div>
      </div>
      <span onClick={() => vote()}>
        <Button voted={voted} votes={votes} />
      </span>
    </StyledPostCard>
  )
    
}

export default PostCard;