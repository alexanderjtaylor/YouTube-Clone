import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Comments = (props) => {

    let {videoId} = useParams()
    const [videoComments, setVideoComments] = useState([])
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        getComments()
      }, []);

    const getComments = async () => {
        let response = await axios.get(`http://127.0.0.1:8000/api/comment/${videoId}`);
        setVideoComments(response.data.items)
        console.log(response.data.items)
    }

    const postComment = async (newComment) => {
        try {
          let response = await axios.post(`http://127.0.0.1:8000/api/comment/${videoId}`, newComment);
          console.log(response.data)
          setCommentData(response.data)
        } catch (error) {
          console.log(error.message)
        }
      }

    return ( 
        <form onSubmit={postComment}>
   
        {videoComments && videoComments.map((comment) => {
        return <div>
        <p>{comment.text}</p>
        <p>{comment.user.username}</p>
        </div> 
  })};
            <input value={commentData} onChange={(event) => setCommentData(event.target.value)}/>
            <button className="post-button">Post Comment</button>
        </form>
    );
}

export default Comments;
