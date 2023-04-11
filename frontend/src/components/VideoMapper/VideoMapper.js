import React from "react";
import { Link } from "react-router-dom";

const VideoMapper = ({videoData, setVideoData}) => {
  {videoData && videoData.map((video) => {
    return <Link to={`/details/${video.id.videoId}`} key={video.id.videoId}>{video.snippet.title} {video.snippet.thumbnails.medium.url} {video.snippet.description}</Link>
  })};
}
export default VideoMapper;
