import styled from "styled-components"
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation, useHistory } from 'react-router-dom';
import { GET_POST } from '../../../graphql/Queries' 
import { useQuery } from '@apollo/client'
import Load from "../../Atoms/Load/Load"
import PostDetailFooter from "./PostDetailFooter"

//Post detail styled
const StyledPostDetail = styled.div`

  .post-detail-wrapper{
    padding: 0px 15px;
    padding-bottom: 90px;
  }
  
  .post-menu-wrapper {
    padding : 15px 0px;
  }
    .post-back-icon {
      color: #1c2027;
      font-size: 25px;
      font-weight: 100;
      margin-left: 5px;
    }
  .post-image-wrapper img{
    width: 100%;
    border-radius: 14px;
    object-fit: cover;
    height: 270px;
  }
  .post-info-wrapper {
    width: 100%;
    border-radius: 14px;
    background-color: #FFFFFF;
    padding: 20px;
  }
  .post-info-header {
    display: flex;
  }
  .post-info-thumb img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }
  .post-info-title {
    margin-left: 15px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
  .post-info-name {
    font-family: "Open Sans";
    font-size: 18px;
    font-weight: bold;
    margin-bottom:5px;
  }
  .post-info-topics-wrapper {
    width: 220px;
    display: flex;
    overflow: auto;
  }
  .post-info-topics-wrapper::-webkit-scrollbar {
    display: none;
  }
  .post-info-topics-scroll {
    width: 1000px;
    display: flex;
  }
  .post-info-topics{
    background: #eee;
    padding: 6px;
    border-radius: 8px;
    margin-right: 10px;
    width: max-content;
    text-transform: uppercase;
    font-family: "Open Sans";
    font-size: 13px;
  }
  .post-image-wrapper{
    margin-bottom: 15px;
    max-width: 1000px;
    margin: auto auto 15px;
  }

  .full-image-true img{
    height: 100% !important;
  }
  .paragraph {
    color: #777;
    font-family: "Open Sans";
    margin: 10px 0px;
    font-size: 14px;
  }
  .post-info-footer {
    position: fixed;
    display: flex;
    justify-content: space-between;
    bottom: 0px;
    background: white;
    width: 100%;
    padding: 10px;
    border-radius: 14px 14px 0px 0px;
    box-shadow: 1px 7px 11px 11px #00000011;
  }
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

function PostDetail() {
  
  //Route handlers
  const location = useLocation();
  const history = useHistory();

  //Create state from location state
  const [slug] = useState(location.state.slug);

  //Create other states
  const [fullImage, setFullImage] = useState(false);

  //Make request to get post based on its slug
  const { loading, data } = useQuery(GET_POST, {
    variables: { slug: slug }
  });


  //Return loading component while loading
  if(loading) {
    return (<Load />);
  }

  //Toggle image full/normal size
  function toggleFullImage() {
    setFullImage(!fullImage);
  }

  //Redirect user to previous feed page
  function pushFeedPage() {
    history.goBack()
  }

  //Render styled post detail 
  return( 
    <StyledPostDetail>
      <div className="post-detail-wrapper">
        <div className="post-menu-wrapper">
          <div className="post-back-icon" onClick={() => {
            pushFeedPage()
          }}>
            <FontAwesomeIcon icon="angle-left" />
          </div>
        </div>
        <div className={`post-image-wrapper full-image-${fullImage}`} onClick={() => {
          toggleFullImage()
        }}>
          <img src={data.post.media[0].url} alt="media"></img>
        </div>
        <div className="post-info-wrapper">
          <div className="post-info-header">
            <div className="post-info-thumb">
              <img src={data.post.thumbnail.url} alt="thumbnail"/>
            </div>
            <div className="post-info-title">
              <div className="post-info-name">{data.post.name}</div>
              <div className="post-info-topics-wrapper">
                <div className="post-info-topics-scroll"> 
                  {data.post.topics.edges.map( (topic, index) => {
                    return (
                      <div key={index} className="post-info-topics">{topic.node.name}</div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="post-info-description">
            {data.post.description.split(".").map( (paragraph, index) => {
              if(paragraph === "") {
                return ''; 
              }
              else{
                return (
                    <div className="paragraph" key={index}>{paragraph}.</div>
                )
              }
            })}
          </div>
        </div>
      </div>
      <PostDetailFooter />
    </StyledPostDetail>
  )
    
}

export default PostDetail;