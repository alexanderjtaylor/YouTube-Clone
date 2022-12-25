import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import key from "../../apiKey";
import axios from 'axios';


const VideoResults = ({videoData, setVideoData}) => {

    let {videoId} = useParams()
    const [videoComments, setVideoComments] = useState([])
    const [commentData, setCommentData] = useState([]);
    const [relatedVideoData, setRelatedVideoData] = useState([]);

    useEffect(() => {
        fetchVideoData()
        fetchComments()
        fetchRelatedVideos()
      }, []);

    
    const fetchVideoData = async () => {
      let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${videoId}&key=${key}&part=snippet&type=video&maxResults=1`);
      setVideoData(response.data.items)
      console.log(response.data.items)
    };

    const fetchComments = async () => {
        try {
          let response = await axios.get(`http://127.0.0.1:8000/api/comment/${videoId}`);
          console.log(response.data)
          setVideoComments(response.data)
        } catch (error) {
          console.log(error.message)
        }
      }

      const fetchRelatedVideos = async () => {
        try {
          let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&key=${key}`);
          console.log(response.data)
          setRelatedVideoData(response.data)
        } catch (error) {
          console.log(error.message)
        }
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
        <div>
            <h1>{videoId.title}</h1>
            <iframe id="ytplayer" type="text/html" width="640" height="360"
  src={`https://www.youtube.com/embed/${videoId}`}
  frameborder="0"></iframe>
            <p>{videoId.description}</p>
                <li {...relatedVideoData}></li>
                <li {...videoComments}></li>
                <li {...commentData}></li>
        </div> 
     );
}
 
export default VideoResults;