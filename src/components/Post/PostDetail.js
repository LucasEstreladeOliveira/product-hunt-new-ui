import styled from "styled-components"
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation, useHistory } from 'react-router-dom';
import { GET_POST } from '../../graphql/Queries' 
import { useQuery } from '@apollo/client'
import Load from "../Load/Load"
import ButtonText from "../Button/ButtonText"

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
  
  const location = useLocation();
  const history = useHistory();

  const [slug] = useState(location.state.slug);
  const { loading, data } = useQuery(GET_POST, {
    variables: { slug: slug }
  });

  const [fullImage, setFullImage] = useState(false);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(0);
  
  useEffect(() => {
    setVotes(data?.post?.votesCount)
  }, [data?.post?.votesCount])

  if(loading) {
    return (<Load />);
  }

  function toggleFullImage() {
    setFullImage(!fullImage);
  }

  function upvote() {
    setVoted(!voted);
    if(!voted) {
      setVotes(votes + 1);
    }else{
      setVotes(votes - 1);
    }
  }
  function pushFeedPage() {
    history.push("/feed")
  }

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
                  {data.post.topics.edges.map( topic => {
                    return (
                      <div className="post-info-topics">{topic.node.name}</div>
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
      <div className="post-info-footer">
        <div className="post-info-button-left">
          <ButtonText>Get it</ButtonText>
        </div>
        <div className="post-info-button-right">
          <ButtonText className={voted ? "voted" : ""} voted={voted} onClick={() => {
            upvote();
          }}>
            Upvote ({votes})
          </ButtonText>

        </div>
      </div>
    </StyledPostDetail>
  )
    
}

export default PostDetail;