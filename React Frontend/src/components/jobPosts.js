import React from "react";
import { useState } from "react";
// import "../assects/User_Profile_details.css";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avtar  from '../assects/IMG/defalutPost.png'
import { faAsterisk , faThumbsUp, faSpinner,faXmark} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
} from "react-bootstrap";

import Select from "react-select";


function JobPost() {

  let cookie = new Cookies();

  const [status, setStatus] = useState(0);
  const [identity ,setIdentity] = useState(Avtar)

  const handelIdentitySubmit = async ()=>{
    const formData = new FormData();
    formData.append("recruiterId",cookie.get("_id"));
    formData.append("identity",identity);
    console.log(identity);
    try {
      const response = await fetch("http://192.168.190.104:4000/recruiter/uploadIdentity", {
      method: "POST",
      body: formData
      });
      
      if (response.ok) {
        const responseData = await response.json();
        if(responseData.message === "uploaded")
          setStatus(2);
      } 
      else {
        throw new Error('Network response was not ok.');
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  
    }
  }
  

  const [jobTitle, setJobTitle] = useState();
  const [location, setLocation] = useState();
  const [jobType, setJobType] = useState();
  const [experienceLevel, setExperienceLevel] = useState();
  const [educationLevel, setEducationLevel] = useState();
  const [skills, setSkills] = useState();
  const [salary, setSalary] = useState(0);
  const [endDate, setEndDate] = useState();
  const [requirement, setRequirement] = useState();
  const [headerImage, setHeaderImage] = useState();
  const [quiz, setQuiz] = useState();
  const [description, setDescription] = useState();

    const [skillMatch, setSkillMatch] = useState([]);


    const handelSubmit = async (event) => {
    event.preventDefault();
    
    let requiredSkill = skills.map(obj => obj.value);
    const formData = new FormData();
    formData.append("recruiterId",cookie.get("_id"));
    formData.append("jobTitle",jobTitle);
    formData.append("jobType",jobType);
    formData.append("jobDescription",description);
    formData.append("experienceLevel",experienceLevel);
    formData.append("educationLevel",educationLevel);
    formData.append("skills",requiredSkill);
    formData.append("salary",salary);
    formData.append("endDate",endDate);
    formData.append("requirement",requirement);
    formData.append("headerImage",headerImage);
    formData.append("quiz",quiz);


    console.log(skills);
    try {
      const response = await fetch("http://192.168.190.104:4000/job/postJob", {
      method: "POST",
      body: formData
      });
      
      if (response.ok) {
        const responseData = await response.json();
        if(responseData.message === "ok")
          setStatus(1);
        else if(responseData.message === "Pending")
          setStatus(2);
        else if(responseData.message === "Not Verified")
          setStatus(3);


      } 
      else {
        throw new Error('Network response was not ok.');
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  
    }
  }
  function handelJobPostChange(event) {
    if (event.target.name === "jobTitle") 
      setJobTitle(event.target.value);
    else if (event.target.name === "jobType") 
      setJobType(event.target.value);
    else if (event.target.name === "location") 
      setLocation(event.target.value);
    else if (event.target.name === "experienceLevel")
      setExperienceLevel(event.target.value);
    else if (event.target.name === "educationLevel")
      setEducationLevel(event.target.value);
    else if (event.target.name === "salary") 
      setSalary(event.target.value);
    else if (event.target.name === "salaryRange") 
      setSalary(event.target.value);
    else if (event.target.name === "endDate") 
      setEndDate(event.target.value);
    else if (event.target.name === "requirement")
      setRequirement(event.target.value);
    else if (event.target.name === "quiz") 
      setQuiz(event.target.files[0]);
    else if (event.target.name === "jobDescription")
      setDescription(event.target.value);
  }

  function getImage(event) {
      const data = new FileReader();
      data.addEventListener('load' ,()=>{
          setHeaderImage(data.result);
      })
      data.readAsDataURL(event.target.files[0]);
  }
  function IdentityUpload(event) {
    const data = new FileReader();
    data.addEventListener('load' ,()=>{
        setIdentity(data.result);
    })
    data.readAsDataURL(event.target.files[0]);
}
  const handleSkillsChange = (selectedOption) => {
    // Handle selected skills here
    // console.log(selectedOption);
    setSkills(selectedOption);
  };

  const skillOptions = skillMatch.map((item, index) => ({
    label: item,
    value: item,
  }));
  const fetchSkills = async (inputValue) => {
    try {
      let response = await fetch(
        `https://api.apilayer.com/skills?q=${inputValue}`,
        {
          method: "GET",
          headers: {
            apikey: "8wAx4IBLQdHOGhl7rccfP4HIiBdrj9k2",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch skills: ${response.statusText}`);
      }

      let skillData = await response.json();
      console.log(skillData);
      setSkillMatch(skillData);

      // Return an empty array here to clear the dropdown if there are no results
      return [];
    } catch (error) {
      console.error("Error fetching skills:", error);

      // Return an empty array in case of an error
      return [];
    }
  };



  return (
    <>
    {
      status ===1 &&
      <Modal show={true}>
         <div className="w-2100 h-25 px-2 py-2 position-relative">
         <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#ff1f1f",cursor:"pointer"}} className="position-absolute end-0 mx-2" onClick={()=>setStatus(0)} />
          <div className="w-100 h-25 px-2 py-2 my-4 ">
            <div className="d-flex w-100 justify-content-center  align-items-center">
              <FontAwesomeIcon icon={faThumbsUp} beat size="2xl" style={{color: "#5cb85c"}} />
              <span className="ps-2 h-100 text-success" style={{fontSize:"2rem"}}>Success</span>
            </div>
          </div>
        </div>
      </Modal>
    }
    {
      status ===2  &&
      <Modal show={true}>
        <div className="w-2100 h-25 px-2 py-2 position-relative">
        <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#ff1f1f",cursor:"pointer"}} className="position-absolute end-0 mx-2" onClick={()=>setStatus(0)} />
          <div className="w-100 h-25 px-2 py-2 my-4 ">
            <div className="d-flex w-100 justify-content-center  align-items-center">
            <FontAwesomeIcon icon={faSpinner} spin size="xl" />
              <span className="ps-2 h-100 text-success" style={{fontSize:"1rem"}}>Your identity is under verification.</span>
            </div>
          </div>
        </div>
      </Modal>
    }
    {
      status ===3  &&
      <Modal show={true}>
        <div className="w-2100 h-25 px-2 py-2 position-relative">
          <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#ff1f1f",cursor:"pointer"}} className="position-absolute end-0 mx-2" onClick={()=>setStatus(0)} />
          <div className="w-100 h-25 px-2 py-2 my-4 ">
            <div className="d-flex w-100 justify-content-center  align-items-center">
              <FormGroup className="w-100">
                <img src={identity} className="w-100 px-5 py-5 round"/>
                <FormLabel className="w-100">
                  <FormControl
                   type="file"
                   name="identity"
                   onChange={IdentityUpload}
                   >

                  </FormControl>
                </FormLabel>
                <FormLabel className="w-100 d-flex justify-content-center">
                  <FormControl 
                  type="button"
                  className="bg-success text-light w-50 mt-3"
                  onClick={handelIdentitySubmit}
                  value="Verify">
                  </FormControl>
                </FormLabel>
              </FormGroup>
             
            </div>
          </div>
        </div>
      </Modal>
    }
      

      <Form className="px-5 py-5 border rounded" onSubmit={handelSubmit}>
        <legend>Enter Post Details :</legend>
        <FormGroup>
          <FormLabel className="w-100 my-3">
            Job Title :{" "}
            <FontAwesomeIcon
              icon={faAsterisk}
              className="mb-2 text-danger"
              style={{ fontSize: "7px" }}
            />
            <FormControl
              type="text"
              name="jobTitle"
              placeholder="Software Developer"
              className="mt-1"
              onChange={handelJobPostChange}
            ></FormControl>
          </FormLabel>

          <div className="d-flex my-3">
            <FormLabel className="w-100 me-2">
              Location :{" "}
              <FontAwesomeIcon
                icon={faAsterisk}
                className="mb-2 text-danger"
                style={{ fontSize: "7px" }}
              />
              <FormControl
                type="text"
                name="location"
                placeholder="location......."
                className="mt-1 form-control"
                onChange={handelJobPostChange}
              ></FormControl>
            </FormLabel>
            <FormLabel className="w-100 ms-2">
              Job Type :{" "}
              <FontAwesomeIcon
                icon={faAsterisk}
                className="mb-2 text-danger"
                style={{ fontSize: "7px" }}
              />
              <select
                name="jobType"
                onChange={handelJobPostChange}
                className="mt-1 form-control"
              >
                <option>Type</option>
                <option value="fullTime">Full-Time</option>
                <option value="partTime">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="permanent">FPermanent</option>
              </select>
            </FormLabel>
          </div>
          <div className="d-flex my-3">
            <FormLabel className="w-100 me-2">
              Experience Level :{" "}
              <FontAwesomeIcon
                icon={faAsterisk}
                className="mb-2 text-danger"
                style={{ fontSize: "7px" }}
              />
              <select
                name="experienceLevel"
                onChange={handelJobPostChange}
                className="mt-1 form-control"
              >
                <option>Exprience Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </FormLabel>
            <FormLabel className="w-100 ms-2">
              Education Level :{" "}
              <FontAwesomeIcon
                icon={faAsterisk}
                className="mb-2 text-danger"
                style={{ fontSize: "7px" }}
              />
              <select
                name="educationLevel"
                onChange={handelJobPostChange}
                className="mt-1 form-control"
              >
                <option>Education Level</option>
                <option value="fullTime">Full-Time</option>
                <option value="partTime">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="permanent">FPermanent</option>
              </select>
            </FormLabel>
          </div>

          <div className="d-flex my-3">
            <FormLabel className="w-50  me-2">
              Skills:
              <Select
                isMulti
                name="skills"
                options={skillOptions}
                className="basic-multi-select my-1"
                classNamePrefix="select"
                value={skills}
                onChange={handleSkillsChange}
                onInputChange={(inputValue, { action }) => {
                  if (action === "input-change") {
                    fetchSkills(inputValue, (options) => {
                      // Update the dropdown options
                      return options;
                    });
                  }
                }}
              />
            </FormLabel>
            <div className="d-flex w-50">
              <FormLabel className="w-100 ">
                Salary :{" "}
                <FontAwesomeIcon
                  icon={faAsterisk}
                  className="mb-2 text-danger"
                  style={{ fontSize: "7px" }}
                />
                <div className="d-flex w-100">
                  <FormControl
                    type="range"
                    value={salary}
                    name="salaryRange"
                    min={0}
                    max={500000}
                    className="mt-1 form-control w-75 me-1"
                    onChange={handelJobPostChange}
                  />

                  <FormControl
                    type="text"
                    name="salary"
                    value={salary}
                    className="mt-1 form-control w-25 ms-1"
                    onChange={handelJobPostChange}
                  />
                </div>
              </FormLabel>
            </div>
          </div>
          <div className="d-flex my-3">
            <FormLabel className="w-100 ">
              End Date :{" "}
              <FontAwesomeIcon
                icon={faAsterisk}
                className="mb-2 text-danger"
                style={{ fontSize: "7px" }}
              />
              <FormControl
                type="date"
                name="endDate"
                className="mt-1 me-1"
                onChange={handelJobPostChange}
              ></FormControl>
            </FormLabel>
            <FormLabel className="w-100 ms-2">
              Requirement (no. candidate) :{" "}
              <FontAwesomeIcon
                icon={faAsterisk}
                className="mb-2 text-danger"
                style={{ fontSize: "7px" }}
              />
              <FormControl
                type="number"
                name="requirement"
                className="mt-1 ms-1"
                onChange={handelJobPostChange}
              ></FormControl>
            </FormLabel>
          </div>
          <div className="d-flex my-3">
            <FormLabel className="w-100 me-1">
              Header Image :
              <FormControl
                type="file"
                name="headerImage"
                accept="image/png, image/jpeg"
                className="mt-1 me-1"
                onChange={getImage}
              ></FormControl>
            </FormLabel>
            <FormLabel className="w-100 ms-1">
              Quiz :
              <FormControl
                type="file"
                name="quiz"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="mt-1 ms-1"
                onChange={handelJobPostChange}
              ></FormControl>
            </FormLabel>
          </div>

          <FormLabel className="w-100 my-2">
            Job Description :{" "}
            <FontAwesomeIcon
              icon={faAsterisk}
              className="mb-2 text-danger"
              style={{ fontSize: "7px" }}
            />
            <textarea
              rows="5"
              name="jobDescription"
              placeholder="decsription here......."
              className="mt-1 form-control"
              onChange={handelJobPostChange}
            ></textarea>
          </FormLabel>
          <div className="d-flex justify-content-end">
            <Button className="bg-success col-1" type="submit">
              Submit
            </Button>
          </div>
        </FormGroup>
      </Form>
    </>
  );
}
export default JobPost;
