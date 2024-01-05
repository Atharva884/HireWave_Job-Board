import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import SideBar from "../sideBar";
import "bootstrap/dist/css/bootstrap.min.css";

import Card from "react-bootstrap/Card";
function RecruiterDashboard() {
  let cookie = new Cookies();
  let navigate = useNavigate();
  let role = cookie.get("role");
  let isLoggedIn = cookie.get("_id");
  console.log(isLoggedIn);

  useEffect(() => {
    if (role === "user") {
      navigate("/candidateDashboard");
    } else if (role === "recruiter") {
      navigate("/recruiterDashboard");
    } else {
      navigate("/login");
    }
  });

  return (
    <div className="w-100 d-flex">
      <div className="d-flex">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default RecruiterDashboard;
