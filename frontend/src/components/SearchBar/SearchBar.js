import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import key from "../../apiKey";
import axios from "axios";


const SearchBar = (props) => {

    const searchVideo = async (event) => {
        event.preventDefault();
        let searchResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${props.searchTerm}&key=${key}&part=snippet&type=video&maxResults=5`);
        props.setVideoData(searchResponse.data.items)
        console.log(searchResponse.data.items)
        let response = props.videoData.filter((video) => {
            if (video.title.includes(props.searchTerm) || video.snippet.channelTitle.includes(props.searchTerm)){
                return true;
            }
            else{
                return false;
            }});
        props.setVideoData(response.data.items)
        console.log(response.data.items)
    }

    return ( 
        <form className='entire-search-bar' onSubmit={searchVideo}>
            <input className='search-box' value={props.searchTerm} onChange={(event) => props.setSearchTerm(event.target.value)}/>
            <button className='button-85'>Find</button>
        </form>
    );
}

export default SearchBar;
