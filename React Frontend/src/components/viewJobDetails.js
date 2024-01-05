import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot,faMoneyCheck,faBuilding,faCirclePlay,faHourglassEnd,faBriefcase,faArrowUpRightDots,faCoins,faSchool,faThumbsUp} from '@fortawesome/free-solid-svg-icons'
function ViewJobDetails() {
    const [jobPost, setJobPost] = useState();
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleCheckboxChange = (event) => {
        const { checked, value } = event.target;
        if (checked) {
            setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, value]);
        } else {
            setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((user) => user !== value));
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const form = new FormData();
                form.append("jobId", id);
                const response = await fetch("http://192.168.190.104:4000/job/getJobById", {
                    method: "POST",
                    body: form
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData.data); // Logging responseData directly, not jobPost
                    setJobPost(responseData.data.job);
                    setUsers(responseData.data.users);
                    
                    setIsLoading(false)
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        
     
            fetchData();
        
    }, [jobPost]);

    const shortList = async () => {
        try {
            const form = new FormData();
            form.append("_id", jobPost._id);
            form.append("userIds",selectedUsers);
            console.log(jobPost._id);

            const response = await fetch("http://192.168.190.104:4000/job/shortlistJobsByUserIds", {
                method: "POST",
                body: form
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData); 
                setSelectedUsers();

                
                
                setIsLoading(false)
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    const hiredUser = async () => {
        try {
            const form = new FormData();
            form.append("_id", jobPost._id);
            form.append("userIds",selectedUsers);
            console.log(jobPost._id);

            const response = await fetch("http://192.168.190.104:4000/job/finalJobHired", {
                method: "POST",
                body: form
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData); 
                setSelectedUsers();
                
                setIsLoading(false)
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    
    return (

        <>
        {
            isLoading == false &&
            <Tabs
                defaultActiveKey="details"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="details" title="Job Details">
                    <div>
                       
                <Card style={{ width: '100%', height:"50%"}}>
                
                <Card.Body>
                    <Card.Title style={{fontSize:'1.7rem',color:'green'}}><strong>{jobPost.jobTitle}</strong></Card.Title> 
                    <div className='w-100 h-50'>
                        <img src={jobPost.headerImage} style={{width:"100%", height:"30vh",objectFit:"contain"}} className=''/>
                    </div>
                    <h6> <FontAwesomeIcon icon={faLocationDot} />&nbsp;{jobPost.location}</h6>
                    <h6> <FontAwesomeIcon icon={faMoneyCheck} />&nbsp;  {jobPost.salary}</h6>
                    <h6> <FontAwesomeIcon icon={faBuilding} />&nbsp; {jobPost.experienceLevel}</h6>
                    <h6> <FontAwesomeIcon icon={faCirclePlay} />&nbsp; 7 Dec'2023</h6>
                    <h6> <FontAwesomeIcon icon={faHourglassEnd} />&nbsp; Apply Before {jobPost.endDate}</h6>
                    <h6> <FontAwesomeIcon icon={faBriefcase} />&nbsp; Offline</h6>
                    <h6> <FontAwesomeIcon icon={faSchool} />&nbsp; Education Level</h6>
                    
                    <span> {jobPost.createdDate}</span>

                    
                    
                    <h6>No.of Applicants/Proposals:</h6>
                    </Card.Body>
  

                    <Card>
                    <Card.Body>
                        <strong>Job Description / Project Description</strong>
                        <p>{jobPost.jobDescription}.</p>
                        
                        <h6 className='mt-3'>Skills:</h6>
                        <ul className='mx-5'>
                            {jobPost.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </Card.Body>
                    </Card>
                </Card>

        </div>
                </Tab>
                <Tab eventKey="home" title="Applied Candidate">
                    <from>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Profile</th>
                            <th className='text-center'>shortlist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((value, index)=>
                            {
                                return(

                                <tr>
                                <td className='col-1'>{index + 1}</td>
                                <td className='col-9'>
                                    <a href='#' target='_blank'>
                                        <img src={value.profileImage}/>
                                        {value.userName}
                                    </a>
                                    </td>
                                <td className='col-2 text-center' >
                                    <input type='checkbox'
                                    name='shortListed[]'
                                    onChange={handleCheckboxChange}
                                    value={value.userId}/>
                                </td>
                                </tr>
                                )
                            })
                        }    
                    </tbody>
                   

                </Table>
                    <div className='d-flex justify-content-end'>
                        <Button
                        onClick={shortList}
                        className='my-5'>Short List</Button>
                    </div>
                </from>
                </Tab>
                <Tab eventKey="profile" title="Short Listed Candidate">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Profile</th>
                            <th className='text-center'>shortlist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((value, index)=>
                            {
                                if(value.status === "Shortlisted")
                                {

                                return(

                                    <tr>
                                    <td className='col-1'>{index + 1}</td>
                                    <td className='col-9'>
                                        <a href='#' target='_blank'>
                                            <img src={value.profileImage}/>
                                            {value.userName}
                                        </a>
                                        </td>
                                    <td className='col-2 text-center' >
                                        <input type='checkbox'
                                        name='shortListed[]'
                                        onChange={handleCheckboxChange}
                                        value={value.userId}/>
                                    </td>
                                    </tr>
                                )
                                }
                            })
                        }    
                    </tbody>
                
                </Table>
                <div className='d-flex justify-content-end'>
                        <Button
                        onClick={hiredUser}
                        className='my-5'> Hire</Button>
                    </div>
                </Tab>
                <Tab eventKey="contact" title="Final List" >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='text-center'>#</th>
                            <th className='text-center'>Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((value, index)=>
                            {
                                if(value.status === "Hired")
                                {

                                return(

                                    <tr>
                                    <td className='col-1'>{index + 1}</td>
                                    <td className='col-9'>
                                        <a href='#' target='_blank'>
                                            <img src={value.profileImage}/>
                                            {value.userName}
                                        </a>
                                        </td>

                                    </tr>
                                )
                                }
                            })
                        }    
                    </tbody>
                
                </Table>
                </Tab>
            </Tabs>
        }
            
        </>
    );
}

export default ViewJobDetails;
