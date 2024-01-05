import React from 'react';
import JobCard from './jobPostcard';
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";

function ViewJobPost() {
    let cookie = new Cookies();
    const [jobPosts, setJobPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const form = new FormData();
            form.append("recruiterId", cookie.get("_id"));

            try {
                const response = await fetch("http://192.168.190.104:4000/job/getJobsByRecruiterId", {
                    method: "POST",
                    body: form
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setJobPosts(responseData.data);
                    console.log(jobPosts)
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                // Handle errors or set an error state here
            }
            finally{
                setIsLoading(false)

            }
        };
        if(jobPosts)
            fetchData();
    }, []);

    return (
        <>

            <div className='w-100 h-100 '>
                <div className='d-flex h-100 justify-content-center align-items-center flex-wrap'>
                {
                    isLoading == false &&
                    jobPosts && Array.isArray(jobPosts) && jobPosts.length > 0 ? (
                    jobPosts.map((job, index) => (
                        <JobCard key={index} title={job.jobTitle} id={job._id} description={job.jobDescription} img={job.headerImage} />
                    ))
                    ) : (
                        <FontAwesomeIcon size='2xl' icon={faSpinner} spin />

                    )
                }
                </div>
               
            </div>

        </>
    );
}

export default ViewJobPost;
