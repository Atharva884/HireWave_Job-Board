import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../src/components/Login";
import Sign_up from "../src/components/Sign_up";
// import Homescreen from './homeScreen'
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/recruiterDetails";
import JobPost from "./components/jobPosts";
import Home from "../src/components/homeScreen";
import RecruiterDashboard from "./components/dashboards/recruiterDashboard";
import CandidateDashboard from "./components/dashboards/candidateDashboard";
import UserProfile from "./components/profiles/userProfile";
import SideBar from "./components/sideBar";
import Cookies from "universal-cookie";
import ViewPosts from "./components/viewJobPosts";
import ViewPostsDetails from "./components/viewJobDetails";

function App() {
  let cookie = new Cookies();

  let isLoggedIn = cookie.get("_id");

  return (
    <BrowserRouter>
      <div className="d-flex h-100 overflow-hidden">
        {isLoggedIn != null ?? (
          <div>
            <SideBar />
          </div>
        )}

        <div className="w-100 vh-100">
          <div className="py-5 px-5 h-100 overflow-auto">
            <Routes>
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Sign_up />} />
              <Route
                path="/candidateDashboard"
                element={<CandidateDashboard />}
              />
              <Route
                path="/recruiterDashboard"
                element={<RecruiterDashboard />}
              />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/hire" element={<JobPost />}></Route>
              <Route path="/viewJobPosts" element={<ViewPosts />}></Route>
              <Route
                path="/viewJobPosts/details"
                element={<ViewPostsDetails />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
