import styled from "styled-components"

const PostCard = styled.div`
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
    }
    .content {
        margin-left: 10px;
        width: 230px;
        align-items: center;
    }
    .content-title {
        font-family: "Raleway", Raleway;
        font-weight: bold;
    }
    .content-tagline {
        font-family: "Raleway", Raleway;
        font-size: 14px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #a2adb2;
        
    }
`

export default PostCard;