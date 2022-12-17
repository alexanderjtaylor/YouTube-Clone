import React from "react";
import { Link } from "react-router-dom";

const VideoMapper = (props) => {
  {props.videoData && props.videoData.map((video) => {
    return <Link to={`/details/${video.id.videoId}`} key={video.id.videoId}>{video.snippet.title}</Link>
  })};
}
export default VideoMapper;