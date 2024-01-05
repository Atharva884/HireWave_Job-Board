import React from 'react';
import DefaultPostImg from '../assects/IMG/defalutPost.png'

function JobPostCard(props)
{
    return (
        <div className='mx-2 my-2'>
            <div class="card" style={{width: "19rem"}}>
                <img class="card-img-top" src={props.img ==null ? DefaultPostImg : props.img} style={{width: "18.9rem" , height:"12rem"}}/>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{props.title}</h5>
                    <p class="card-text overflow-hidden" style={{textOverflow:"ellipsis", height:"4rem", whiteSpace:"nowrap"}} >{props.description}</p>
                    <a href={"/viewJobPosts/details/?id=" +props.id} class="btn btn-primary ">View</a>
                </div>
            </div>
            
        </div>
    )
}

export default JobPostCard;