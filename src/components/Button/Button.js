import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from 'react'


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

  const [ votes, setVotes] = useState(props.votes)
  const [ voted, setVoted] = useState(props.voted)


  useEffect(() => {
    setVotes(props.votes)
    setVoted(props.voted)
  }, [props.votes, props.voted])
  
  return(
    <StyledButton className={voted ? 'voted' : ''} onClick={() => {
      console.log("votado")
      setVoted(!voted);
      if(voted === false) {
        setVotes(votes + 1)
      }else {
        setVotes(votes - 1)
      }
      }}>
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