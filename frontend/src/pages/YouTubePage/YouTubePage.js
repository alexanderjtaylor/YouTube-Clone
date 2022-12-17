import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import key from "../../apiKey";
import axios from "axios";
import { Link } from "react-router-dom";
import VideoMapper from "../../components/VideoMapper/VideoMapper";
import SearchBar from "../../components/SearchBar/SearchBar";

const YouTubePage = () => {
  const [user, token] = useAuth();
  const [videoData, setVideoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("bob ross")

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
      <h1>Home Page for {user.username}!</h1>
      <SearchBar videoData = {videoData} setVideoData = {setVideoData}/>
      {videoData && videoData.map((video) => {
    return <Link to={`/details/${video.id.videoId}`} key={video.id.videoId}>{video.snippet.title} {video.snippet.description}</Link>
  })};
    </div>
  );
};

export default YouTubePage;