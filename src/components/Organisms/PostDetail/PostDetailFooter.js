import styled from "styled-components"
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePosts } from "../../../providers/posts"
import ButtonText from "../../Atoms/Button/ButtonText"

//Post detail styled
const StyledPostInfoFooter = styled.div`

    position: fixed;
    display: flex;
    justify-content: space-between;
    bottom: 0px;
    background: white;
    width: 100%;
    padding: 10px;
    border-radius: 14px 14px 0px 0px;
    box-shadow: 1px 7px 11px 11px #00000011;
  

  .post-info-button-left, .post-info-button-right {
    width: 100%;
    margin: 5px 10px;
  }

  .voted {
    border: 1px solid #d9552d !important;
    background-color: #d9552d !important;
    color: #FFFFFF;
  }
`

function PostDetailFooter() {
  
  //Route handlers
  const location = useLocation();

  //Get voted posts from context
  const { votedPosts, setVotedPosts } = usePosts();

  //Create other states
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(0);

  //Update votes
  useEffect(() => {
    votedPosts?.forEach(post => {
      if(post.id === location.state.slug ){
        setVoted(post.isVoted);
        setVotes(post.votes)
      }
    })
  }, [votedPosts, location])

  //Handles upvote action
  function upvote() {
    let newVotedPosts = votedPosts.map(votedPost => {
      if(location.state.slug === votedPost.id) {
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

  //Render styled post detail 
  return( 
    <StyledPostInfoFooter>
        <div className="post-info-button-left">
          <span className="post-info-button-wrapper" onClick={() => {}}>
            <ButtonText label="Get it" />
          </span>
        </div>
        <div className="post-info-button-right">
          <span className="post-info-button-wrapper" onClick={() => upvote()}>
            <ButtonText voted={voted} votes={votes} label="Upvote" />
          </span>
        </div>
      </StyledPostInfoFooter>
  )
    
}

export default PostDetailFooter;