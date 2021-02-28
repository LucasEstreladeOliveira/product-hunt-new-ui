import React, { useState } from 'react';

export const PostsContext = React.createContext({});

export const PostsProvider = props => {

    const [ votedPosts, setVotedPosts ] = useState([]);
    const [ postedBefore, setPostedBefore ] = useState(null);
    const [ topic, setTopic ] = useState(null);

    return (
        <PostsContext.Provider value={{ votedPosts, setVotedPosts, postedBefore, setPostedBefore, topic, setTopic }}>
            {props.children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => React.useContext(PostsContext) ;
