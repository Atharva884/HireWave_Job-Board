import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../sideBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import {
  faLocationDot,
  faMoneyCheck,
  faBuilding,
  faCirclePlay,
  faHourglassEnd,
  faBriefcase,
  faArrowUpRightDots,
  faCoins,
  faSchool,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { ip } from "../../constant";

function CandidateViewJobPost() {
  let cookie = new Cookies();
  let navigate = useNavigate();
  let role = cookie.get("role");
  let isLoggedIn = cookie.get("_id");
  console.log(isLoggedIn);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (role === "user") {
      navigate("/candidateDashboard");
    } else if (role === "recruiter") {
      navigate("/recruiterDashboard");
    } else {
      navigate("/login");
    }
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Show loading screen
        setLoading(true);

        // Fetch data from the API
        const response = await fetch(`${ip}/job/getAllJobs`);

        if (response.ok) {
          const data = await response.json();
          setJobs(data.data);
        }

        // Update state with fetched data
        // setJobs(data);

        // Hide loading screen
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, e.g., show an error message
      }
    };

    // Invoke the fetchData function
    fetchAllJobs();
  }, []);

  console.log(jobs);

  const currentDate = new Date();
  const options = { day: "numeric", month: "short", year: "numeric" };

  return (
    <>
      <div>
        {loading ? (
          // Loading screen or spinner while data is being fetched
          <p>Loading...</p>
        ) : (
          // Render your component with the fetched data
          <div>
            <SideBar />
            <div>
              <h1>Jobs List</h1>
              <div className="m-5 w-100">
                {jobs.length > 0 &&
                  jobs.map((job) => (
                    <Card key={job.id} style={{ width: "43rem" }}>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <div>
                            <Button
                              variant="outline-dark"
                              disabled
                              className=""
                            >
                              <FontAwesomeIcon icon={faArrowUpRightDots} />
                              &nbsp;Actively Hiring
                            </Button>
                            <br />
                          </div>

                          <div
                            className="border border-success rounded px-2 py-2"
                            style={{ borderWidth: "1rem" }}
                          >
                            <FontAwesomeIcon icon={faCoins} />
                            <b>10</b>
                          </div>
                        </div>
                        <Card.Img variant="top" src={job.headerImage} />
                        {/* <Card.Title style={{fontSize:'1.8rem', color:'green'}}><strong>Title</strong></Card.Title> */}
                        <Card.Title
                          style={{ fontSize: "1.7rem", color: "green" }}
                        >
                          <strong>{job.jobTitle}</strong>
                        </Card.Title>
                        <p>{job.jobDescription}</p>
                        <h5>
                          <FontAwesomeIcon icon={faLocationDot} />
                          &nbsp; {job.location}
                        </h5>
                        <h5>
                          <FontAwesomeIcon icon={faMoneyCheck} />
                          &nbsp; {job.salary.toLocaleString()}
                        </h5>
                        <h5>
                          <FontAwesomeIcon icon={faBuilding} />
                          &nbsp;
                          {job.experienceLevel.charAt(0).toUpperCase() +
                            job.experienceLevel.slice(1)}
                        </h5>
                        <h5>
                          <FontAwesomeIcon icon={faCirclePlay} />
                          &nbsp;
                          {job.startDate}
                        </h5>
                        <h5>
                          {" "}
                          <FontAwesomeIcon icon={faHourglassEnd} />
                          &nbsp; Apply Before {job.endDate}
                        </h5>
                        <h5>
                          {" "}
                          <FontAwesomeIcon icon={faBriefcase} />
                          &nbsp; Offline
                        </h5>
                        <h5> </h5>
                        <h5>
                          {" "}
                          <FontAwesomeIcon icon={faSchool} />
                          &nbsp; Education Level
                        </h5>

                        <h5> Created Date</h5>

                        <Card.Body>
                          <Button
                            variant="outline-dark"
                            disabled
                            style={{ float: "left" }}
                          >
                            JOB
                          </Button>
                          <br />
                          <br />
                          <h5>No.of Applicants/Proposals:</h5>
                        </Card.Body>
                      </Card.Body>

                      <Card>
                        <Card.Body>
                          <strong>Job Description / Project Description</strong>
                          <p>
                            Lorem ipsum dolor sit amet. Sed deserunt doloremque
                            in dolorem laboriosam qui excepturi sequi et
                            exercitationem nulla sed atque excepturi qui
                            corrupti dolor nam similique ducimus. Ut provident
                            sunt et incidunt obcaecati aut voluptatibus nostrum
                            eum quia autem sed provident fugit rem fuga libero.
                            Et quos atque qui voluptatem quia qui neque
                            blanditiis et voluptatem voluptatem ab sunt corrupti
                            et assumenda voluptatem et ipsam sint. Est nihil
                            perferendis ut cumque eius aut autem dicta ad quidem
                            provident et minus ratione qui vitae provident. Sit
                            doloribus vitae qui commodi architecto At officiis
                            dolorem sit autem earum nam dolorem quam aut
                            explicabo dolorum aut iure animi.
                          </p>

                          {/* <h5>Requirement:</h5> */}
                          {/* <Card>
                            <Card.Body>....</Card.Body>
                          </Card> */}

                          <h5>Skills</h5>
                          <Card>
                            <Card.Body>....</Card.Body>
                          </Card>
                          <Card.Body>
                            <Button
                              variant="success"
                              style={{ float: "right", width: "120px" }}
                              onClick={handleShow}
                            >
                              Apply
                            </Button>
                          </Card.Body>
                        </Card.Body>
                      </Card>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>

    // <div className="w-100 d-flex ">

    //   <Modal show={show} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Confirmation</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>Read the Following And Proceed.</Modal.Body>
    //     <Modal.Body>
    //       1.Have You Read The Requirements.
    //       <br />
    //       2.The Credits Will be Subtracted.
    //       <br />
    //     </Modal.Body>

    //     <Modal.Footer>
    //       <div className="d-flex">
    //         <div className="d-flex justify-content-center">
    //           <Button
    //             variant="success"
    //             style={{ width: "20rem" }}
    //             onClick={handleClose}
    //           >
    //             Apply
    //           </Button>
    //         </div>
    //       </div>
    //     </Modal.Footer>
    //   </Modal>
    // </div>
  );
}
export default CandidateViewJobPost;
