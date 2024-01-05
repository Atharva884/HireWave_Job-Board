import React, { useEffect } from "react";
import "../assects/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import homeimg from "../assects/IMG/homeimage.jpeg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  let cookie = new Cookies();
  let navigate = useNavigate();

  useEffect(() => {
    console.log("UseEffect executes");
    // Check if the 'role' cookie exists
    const role = cookie.get("role");
    const _id = cookie.get("_id");
    console.log(role);

    if (role === "user") {
      // If the role is 'user', navigate to the candidateDashboard
      navigate("/candidateDashboard");
    } else if (role === "recruiter") {
      // If the role is 'recruiter', navigate to the recruiterDashboard
      navigate("/recruiterDashboard");
    } else if (role == undefined) {
      navigate("/");
    }
    // Add more conditions based on your roles

    // If the 'role' cookie doesn't exist, the user is not logged in
    // You can handle this case as needed, perhaps by redirecting to the login page
  }, [cookie.role, navigate]);

  return (
    // <div className='gradient_background'></>
    <div className="">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">HireWave</Navbar.Brand>
          <Nav className="homeScreenNavbar">
            <Nav.Link href="./Login" className="">
              Already Register Login
            </Nav.Link>
            {/* <Nav.Link href="./signup" className=''>Register</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>

      <div className="homeScreenQuote text-center">
        <b className="heading">HireWave</b>
        <h1 classname="position-absolute top-50 start-50 translate-middle font-size: 80px">
          Let's Match You With The Perfect Job
        </h1>
        <Button variant="success" href="/signup">
          Register Now!
        </Button>
      </div>

      <div class="homeScreenimage">
        <img src={homeimg} alt="" width={650}></img>
      </div>
    </div>
  );
}
export default Home;
