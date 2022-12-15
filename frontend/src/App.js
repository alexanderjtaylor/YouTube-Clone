// General Imports
import { Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import "./App.css";
import { DATA } from "./LocalData";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {

  const [users, setUsers] = useState([DATA])

  useEffect(() => {
    //fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      let response = await axios.get("https://jsonplaceholder.typicode.com/users");
      console.log(response.data)
      setUsers(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
              {users && users.map(user => {
                return <li key={user.id}>{user.name} {user.company.name}</li>
              })}
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
