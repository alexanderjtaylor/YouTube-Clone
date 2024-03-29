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
        fetchVideoData(videoId)
        fetchRelatedVideos(videoId)
      }, [videoId]);

    
    const fetchVideoData = async (Id) => {
      let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${Id}&key=${key}&part=snippet&type=video&maxResults=1`);
      setVideoData(response.data.items)
      console.log(response.data.items)
    };


      const fetchRelatedVideos = async (Id) => {
        try {
          let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${Id}&type=video&key=${key}&part=snippet&maxResults=3`);
          console.log(response.data.items)
          setRelatedVideoData(response.data.items)
        } catch (error) {
          console.log(error.message)
        }
      }

      function unEscape(htmlStr) {
        htmlStr = htmlStr.replace(/&lt;/g , "<");	 
        htmlStr = htmlStr.replace(/&gt;/g , ">");     
        htmlStr = htmlStr.replace(/&quot;/g , "\"");  
        htmlStr = htmlStr.replace(/&#39;/g , "\'");   
        htmlStr = htmlStr.replace(/&amp;/g , "&");
        return htmlStr;}

    return (
        <div>
            <iframe className='main-video' id="ytplayer" type="text/html" width="640" height="360"
  src={`https://www.youtube.com/embed/${videoId}`}
  frameborder="0"></iframe>
{videoData && videoData.map((video) => {
    return <div>
      <h1 className='video-results-video-title'>{unEscape(video.snippet.title)}</h1>
      <p className='video-results-channel-title'>{unEscape(video.snippet.channelTitle)}</p>
      </div> 
  })}
  <div className='related-videos'>
  {relatedVideoData && relatedVideoData.map((video) => {
    return <div className='entire-video'>
      <Link to={`/details/${video.id.videoId}`} key={video.id.videoId}>
      <img className='thumbnail' src={video.snippet.thumbnails.medium.url} />
      <h1 className='video-title'>{unEscape(video.snippet.title)}</h1>
      <p className='channel-title'>{unEscape(video.snippet.channelTitle)}</p>
      </Link>
      </div> 
  })}</div>
  <Comments/>
        </div> 
     );
}
 
export default VideoResults;