import React, { useState } from 'react';


const VideoResults = (props) => {

    const [title, setTitle] = useState('')
    const [videoId, setVideoId] = useState('')
    const [thumbnails, setthumbnails] = useState('')
    const [description, setDescription] = useState('')

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