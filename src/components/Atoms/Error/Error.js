import styled from "styled-components";
import { useState, useEffect } from "react"

const StyledError = styled.div`
    background-color: white;
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
    font-family: 'Open Sans';

    .error {
        display: block;
        text-align: center;
        color: #d9552d;
    }
    .error-message {
        margin-top: 10px;
        text-align: center;
        color: #d9552d;
    }
`

function Error(props) {
  
    //Create button states
    const [ error, setError ] = useState(props.error);
  
    //Update button states
    useEffect(() => {
      setError(props.error);
    }, [props.error])
  
    //Render Styled Button
    return(
      <StyledError className="error-wrapper" data-testid="error">
        <div className="error-title">
            <span className="error">
                There's something wrong. 
            </span>
            <span className="error">
                Try again later.
            </span>
        </div>
        <div className="error-message">
            { error }
        </div>
      </StyledError>
    )
  }

export default Error;