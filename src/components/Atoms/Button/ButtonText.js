import styled from "styled-components";
import { useState, useEffect } from 'react';


const StyledButtonText  = styled.button`
    height: 3.5em;
    width: 100%;
    border: 1px solid #dbdee0;
    border-radius: 14px;
    outline: none;
    cursor: pointer;
    position: relative;
    background-color: #ffffff;
    box-shadow: 1px 1px 6px 0px #00000011;

`;

function ButtonText(props) {
  
    //Create button states
    const [ label, setLabel ] = useState(props.label);
    const [ votes, setVotes ] = useState(props.votes);
    const [ voted, setVoted ] = useState(props.voted);
  
    //Update button states
    useEffect(() => {
      setVotes(props.votes);
    }, [props.votes])
  
    useEffect(() => {
      setVoted(props.voted);
    }, [props.voted])

    useEffect(() => {
      setLabel(props.label);
    }, [props.label])
  
    //Render Styled Button
    return(
      <StyledButtonText className={voted ? 'voted' : ''} data-testid="button_text">
          {label}{votes ? `(${votes})` : ''}
      </StyledButtonText>
    )
  }

export default ButtonText;