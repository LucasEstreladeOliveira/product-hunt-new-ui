import styled from "styled-components"
import { useEffect, useState } from 'react';
import Button from "../Button/Button"
// import { GET_POST } from '../../graphql/Queries' 
// import { useQuery } from '@apollo/client'

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

  // const { loading, data, error } = useQuery(GET_POST, {
  //   variables: { slug: props.edge.node.slug }
  // });
  
  // function getPost(slug) {

  // } 

  const [edge, setEdges] = useState(props.edge);

  useEffect(() => {
    setEdges(props.edge)
  }, [props.edge])

  return( 
    <StyledPostCard>
      <div className="conten-wrapper" onClick={() => {
        console.log("cliquei no post", edge.node.slug)
      }}>
        <div className="content-thumb">
          <img src={edge.node.thumbnail.url} alt="thumbnail"></img>
        </div>
        <div className="content">
          <div className="content-title">{edge.node.name}</div>
          <div className="content-tagline">{edge.node.tagline}</div>
        </div>
      </div>
      <Button votes={edge.node.votesCount} voted={false}/>
    </StyledPostCard>
  )
    
}

export default PostCard;