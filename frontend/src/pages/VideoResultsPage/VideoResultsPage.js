import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import key from "../../apiKey";
import axios from 'axios';
import { Link } from "react-router-dom";
import Comments from '../../components/Comments/Comments';


const VideoResults = ({videoData, setVideoData}) => {

    let {videoId} = useParams()
    const [relatedVideoData, setRelatedVideoData] = useState([]);

    useEffect(() => {
        fetchVideoData()
        fetchRelatedVideos()
      }, []);

    
    const fetchVideoData = async () => {
      let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${videoId}&key=${key}&part=snippet&type=video&maxResults=1`);
      setVideoData(response.data.items)
      console.log(response.data.items)
    };


      const fetchRelatedVideos = async () => {
        try {
          let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&key=${key}&part=snippet&maxResults=3`);
          console.log(response.data.items)
          setRelatedVideoData(response.data.items)
        } catch (error) {
          console.log(error.message)
        }
      }

    return (
        <div>
            <iframe id="ytplayer" type="text/html" width="640" height="360"
  src={`https://www.youtube.com/embed/${videoId}`}
  frameborder="0"></iframe>
{videoData && videoData.map((video) => {
    return <div>
      <h1>{video.snippet.title}</h1>
      <p>{video.snippet.description}</p>
      </div> 
  })};
  <Comments/>
  {relatedVideoData && relatedVideoData.map((video) => {
    return <div>
      <Link to={`/details/${video.id.videoId}`} key={video.id.videoId}>
      <h1>{video.snippet.title}</h1>
      <img src={video.snippet.thumbnails.medium.url} />
      </Link>
      </div> 
  })};
        </div> 
     );
}
 
export default VideoResults;