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
    const [clickedLike, setClickedLike ] = useState(false);
    const [clickedDislike, setClickedDislike] = useState(false);

    useEffect(() => {
        getComments()
        // console.log(clickedLike)
      }, []);

    const getComments = async () => {
        let response = await axios.get(`http://127.0.0.1:8000/api/comment/${videoId}/`);
        setVideoComments(response.data)
        console.log(response.data)
        console.log(user)
    };

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
      };

      function handleSubmit(event) {
        event.preventDefault();
        let newComment = {
          video_id: videoId,
          text: commentData,
          user: user,
        };
        console.log(newComment)
        postComment(newComment)
    };

    // function handleClickLike() {
    //   setClickedLike(prev => !prev);
    //   setClickedDislike(false);
    // }

    // function handleClickUnlike() {
    //   setClickedLike(prev => !prev);
    //   setClickedDislike(false);
    // }


  // function handleClickDislike() {
  //   setClickedDislike(prev => !prev);
  //   setClickedLike(false);
  // };


  // const patchComment = async (comment) => {
  //   // let comment_id = comment.id;
  //   {clickedLike ? comment.likes =  comment.likes - 1: comment.likes = comment.likes + 1};
  //   // let comment_add = comment.likes +1;
  //   try {
  //     let response = await axios.put(`http://127.0.0.1:8000/api/comment/${comment.comment_id}/comment_update`, comment, {
  //       headers: {
  //           Authorization: 'Bearer ' + token,
  //       },
  //   });
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // };

  // const patchComment2 = async (comment) => {
  //   let comment_id = comment.id;
  //   let comment_minus = comment.likes -1;
  //   try {
  //     let response = await axios.put(`http://127.0.0.1:8000/api/comment/${comment_id}/comment_update`, comment_minus, {
  //       headers: {
  //           Authorization: 'Bearer ' + token,
  //       },
  //   });
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // };

  // const patchComment3 = async (comment) => {
  //   let comment_id = comment.id;
  //   let comment_add = comment.dislikes += 1;
  //   try {
  //     let response = await axios.put(`http://127.0.0.1:8000/api/comment/${comment_id}/comment_update`, comment_add, {
  //       headers: {
  //           Authorization: 'Bearer ' + token,
  //       },
  //   });
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // };

  // const patchComment4 = async (comment) => {
  //   let comment_id = comment.id;
  //   {clickedDislike ? comment.dislikes =  comment.dislikes - 1: comment.dislikes = comment.dislikes + 1};
  //   // let comment_minus = comment.dislikes -=1;
  //   try {
  //     let response = await axios.put(`http://127.0.0.1:8000/api/comment/${comment_id}/comment_update`, comment.dislikes, {
  //       headers: {
  //           Authorization: 'Bearer ' + token,
  //       },
  //   });
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // };

  // const handleDislikeClick = (comment) => {
  //   setClickedDislike(prev => !prev);
  //   console.log(clickedDislike)
  //   patchComment4(comment)};
  //     // let comment_id = comment.id;
  //     // let comment_add = comment.likes += 1;
  //     // let comment_minus = comment.likes -=1;
  //     // clickedLike ? patchComment4(comment) : patchComment3(comment)};


  //   const handleLikeClick = (comment) => {
  //       let newComment = {
  //         comment_id: comment.id,
  //         video_id: comment.video_id,
  //         text: comment.text,
  //         user: user,
  //         likes: comment.likes,
  //         dislikes: comment.dislikes
  //       };
  //     setClickedLike(prev => !prev);
  //     patchComment(newComment)
  //   };

    

    return ( 
        <form className='comment-form' onSubmit={handleSubmit}>
        <div className="user-comment">
            <input className='comment-box' value={commentData} onChange={(event) => setCommentData(event.target.value)}/>
            <button className='button-85'>Post</button>
        </div>
        <div className="comment-section-wrapper">
        <p className="comment-count">{videoComments.length} Comments</p>
        {videoComments && videoComments.map((comment) => {
        return <div className="comment-section">
        <p className="comment-username">{comment.user.username}</p>
        <p className="comment-text">{comment.text}</p>
        {/* <button className="icon-btn" onClick={() => handleLikeClick(comment)}><i class="fas fa-thumbs-up"></i> Like</button>
        <button className="icon-btn" onClick={() => handleDislikeClick(comment)}><i class="fas fa-thumbs-down"></i> Dislike</button> */}
        {/* <p className="comment-text">Likes: {comment.likes}</p>
        <p className="comment-text"> Dislikes: {comment.dislikes}</p> */}
        </div>
  })}</div>
        </form>
    );
}

export default Comments;
