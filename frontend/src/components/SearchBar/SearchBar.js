import React, { useState } from 'react';

const SearchBar = (props) => {

    const [searchVideo, setSearchVideo] = useState('')

    function searchForVideo(event){
        event.preventDefault();
        let response = props.videoData.filter((video) => {
            if (video.title.includes(searchVideo) || video.snippet.channelTitle.includes(searchVideo)){
                return true;
            }
            else{
                return false;
            }});
        props.setVideoData(response.data.items)
    }

    return ( 
        <form onSubmit={searchForVideo}>
            <input value={searchVideo} onChange={(event) => setSearchVideo(event.target.value)}/>
            <button>Search</button>
        </form>
    );
}

export default SearchBar;
