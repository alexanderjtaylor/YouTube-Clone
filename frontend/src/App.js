// General Imports
import { Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import "./App.css";

// Pages Imports
import YouTubePage from "./pages/YouTubePage/YouTubePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VideoResults from "./pages/VideoResultsPage/VideoResultsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {

  //const [users, setUsers] = useState([])
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    //fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      let response = await axios.get("https://www.googleapis.com/youtube/v3/search?q=reactmongoose&key=AIzaSyA-U1xR6szUTkhjPkEIY2o8iaUIZ7_4OlI&part=snippet&type=video&maxResults=5");
      console.log(response.data)
      //setUsers(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><YouTubePage videoData = {videoData} setVideoData = {setVideoData}/></PrivateRoute>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details/:videoId" element={<VideoResults videoData = {videoData} setVideoData = {setVideoData}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
