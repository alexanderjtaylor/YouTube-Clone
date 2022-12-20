import React, { useState } from 'react';
import { useParams } from "react-router-dom";


const VideoResults = (props) => {

    let {videoId} = useParams()

    <iframe id="ytplayer" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
  frameborder="0"></iframe>

    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        fetchComments()
      }, []);

    const fetchComments = async () => {
        try {
          let response = await axios.get(`http://127.0.0.1:8000/api/comment/${video.id.videoId}`);
          console.log(response.data)
          setVideoData(response.data)
        } catch (error) {
          console.log(error.message)
        }
      }

    return ( 
        <form>
            <div>
                <li>{props.videoData.title}</li>
                <li>{props.videoData.videoId}</li>
                <li>{props.videoData.thumbnails}</li>
                <li>{props.videoData.description}</li>
            </div> 
        </form>
     );
}
 
export default VideoResults;