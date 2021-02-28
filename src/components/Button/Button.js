import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from 'react'
import { usePosts } from "../../providers/posts"


const StyledButton  = styled.button`
    height: 3.5em;
    width: 3.5em;
    border: 1px solid #f2f4f6;
    border-radius: 14px;
    margin: 5px;
    margin-left: 60px;
    outline: none;
    cursor: pointer;
    position: relative;
    background-color: #ffffff;

    .button-wrapper {
        display: block;
        margin: auto;
        font-size: 14px;
    }

    .icon-wrapper {
        margin: auto;
        font-size: 25px;
        margin-top: -7px;
    }

    .votes {
        margin-top: -5px;
    }

`;


function Button(props) {

  const [ edge, setEdge ] = useState(props.edge)

  const { votedPosts, setVotedPosts } = usePosts();
  
  const [voted, setVoted ] = useState(false);
  const [votes, setVotes ] = useState(votedPosts.votes);

  useEffect(() => {
    votedPosts?.forEach(post => {
      if(post.id === edge.node.slug ){
        setVoted(post.isVoted);
        setVotes(post.votes)
      }
    })
  }, [votedPosts, edge])

  useEffect(() => {
    setEdge(props.edge)
  }, [props.edge])
  
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
  return(
    <StyledButton 
      className={voted ? 'voted' : ''} 
      onClick={() => { vote() }}
    >
      <div className="button-wrapper">
      <div className="icon-wrapper">
        <FontAwesomeIcon icon="caret-up"></FontAwesomeIcon>
      </div>
      <div className="votes">
        {votes}
      </div>
      </div>
    </StyledButton>
  )
}

export default Button;