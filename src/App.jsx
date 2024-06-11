import React, { useContext, useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { AuthContext, FirebaseContext } from "./Store/FirebaseContext";
import Create from "./Components/Create/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./Store/PostContext";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </>
  );
}

export default App;
