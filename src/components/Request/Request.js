import './Request.css'
import {FaExclamationTriangle, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Request({request, accepted, declined, cancelled}) {
    const {user} = useContext(AuthContext);

    async function handleStatus(status) {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:8080/requests/${request.id}?status=${status}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (e) {
            console.error(e);
        }
    }


    return (
        <li className="request" key={request.id}>
            <div>
                <Link to={`/profile/${request.sender.username}`}>
                    {request.sender.username}
                </Link>
                {request.status === "PENDING" && request.receiver.username === user.username &&
                    <span>
                        <FaThumbsUp onClick={() => {
                            accepted(request)
                            handleStatus("accepted")
                        }}/>
                        <FaThumbsDown onClick={() => {
                            declined(request)
                            handleStatus("declined")
                        }}/>
                    </span>}
            </div>

            <div>
                <Link to={`/profile/${request.receiver.username}`}>
                    {request.receiver.username}
                </Link>
                {request.status === "PENDING" && request.sender.username === user.username &&
                    <span>
                        <FaExclamationTriangle onClick={() => {
                            cancelled(request)
                            handleStatus("cancelled")
                        }}/>
                    </span>}
            </div>

        </li>
    );


}

export default Request;