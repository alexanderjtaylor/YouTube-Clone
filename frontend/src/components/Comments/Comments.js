import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Comments = (props) => {
    const [user, token] = useAuth();
    let {videoId} = useParams()
    const [videoComments, setVideoComments] = useState([])
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        getComments()
      }, []);

    const getComments = async () => {
        let response = await axios.get(`http://127.0.0.1:8000/api/comment/${videoId}/`);
        setVideoComments(response.data)
        console.log(response.data)
        console.log(user)
    }

    const postComment = async (newComment) => {
        try {
          let response = await axios.post(`http://127.0.0.1:8000/api/comment/${videoId}/post-comment`, newComment, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
          console.log(response.data)
          setCommentData(response.data)
          getComments()
          setCommentData("")
        } catch (error) {
          console.log(error.message)
        }
      }

      function handleSubmit(event) {
        event.preventDefault();
        let newComment = {
          video_id: videoId,
          text: commentData,
          user: user,
        };
        console.log(newComment)
        postComment(newComment)
    }

    return ( 
        <form className='comment-form' onSubmit={handleSubmit}>
   
        {videoComments && videoComments.map((comment) => {
        return <div>
        <p>{comment.text}</p>
        <p>{comment.user.username}</p>
        </div> 
  })}
            <input className='comment-box' value={commentData} onChange={(event) => setCommentData(event.target.value)}/>
            <button className='button-85'>Post</button>
        </form>
    );
}

export default Comments;
