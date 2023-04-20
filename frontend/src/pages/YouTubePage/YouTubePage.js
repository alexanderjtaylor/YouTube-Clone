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


  return (
    <div className="container">
      <h1 className='welcome-header'>Welcome, {user.username}</h1>
      <div className='welcome-header-wrapper'>
      <SearchBar videoData = {videoData} setVideoData = {setVideoData} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
      </div>
      <div className='entire-video'>
      {videoData && videoData.map((video) => {
    return <Link to={`/details/${video.id.videoId}`} key={video.id.videoId}>
      <img className='thumbnail' src={video.snippet.thumbnails.medium.url} />
      <h1 className='video-title'>{video.snippet.title}</h1> 
      <p className='channel-title'>{video.snippet.channelTitle}</p>
      </Link>
  })}
    </div>
    </div>
  );
};

export default YouTubePage;