import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import key from "../../apiKey";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const YouTubePage = ({videoData, setVideoData}) => {
  const [user, token] = useAuth();
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchSearchResults()
  }, [token]);

  const fetchSearchResults = async () => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${key}&part=snippet&type=video&maxResults=5`);
    setVideoData(response.data.items)
    console.log(response.data.items)
  };

  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g , "<");	 
    htmlStr = htmlStr.replace(/&gt;/g , ">");     
    htmlStr = htmlStr.replace(/&quot;/g , "\"");  
    htmlStr = htmlStr.replace(/&#39;/g , "\'");   
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;
}


  return (
    <div className="container">
      <h1 className='welcome-header'>Welcome, {user.username}</h1>
      <div className='welcome-header-wrapper'>
      <SearchBar videoData = {videoData} setVideoData = {setVideoData} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
      </div>
      <div className='entire-video-home'>
      {videoData && videoData.map((video) => {
    return <Link to={`/details/${video.id.videoId}`} key={video.id.videoId}>
      <img className='thumbnail' src={video.snippet.thumbnails.medium.url} />
      <h1 className='video-title-home'>{unEscape(video.snippet.title)} </h1> 
      <p className='channel-title-home'>{unEscape(video.snippet.channelTitle)}</p>
      </Link>
  })}
    </div>
    </div>
  );
};

export default YouTubePage;