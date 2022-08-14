import './Request.css'
import {FaExclamationTriangle, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Request({request, incoming, removeRequest}) {
    const [requestStatus, setRequestStatus] = useState("pending");

    async function handleStatus( status) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8080/requests/${request.id}`,
                { status: status}, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setRequestStatus(response.data.status);
            {
                status === "declined" || status === "cancelled" && removeRequest(request.id)
            }
        } catch(e) {
            console.error(e);
        }
    }


    return (
        <li className="request" key={request.id}>
            { incoming ?
                <div>
                    <Link to={`/profiel/${request.sender.username}`}>
                        {request.sender.username}
                    </Link>
                    <span>
                        <FaThumbsUp onClick={() => handleStatus("accepted")}/>
                        <FaThumbsDown onClick={() => handleStatus("declined")}/>
                    </span>
                </div>
                :
                <div>
                    <Link to={`/profiel/${request.receiver.username}`}>
                        {request.receiver.username}
                    </Link>
                    <span>
                        <FaExclamationTriangle onClick={() => handleStatus("cancelled")}/>
                    </span>
                </div>
            }
        </li>
    );


}

export default Request;