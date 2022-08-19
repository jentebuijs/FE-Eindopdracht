import './Request.css'
import {FaExclamationTriangle, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Request({request, judgement}) {
    const {user} = useContext(AuthContext);

    async function handleStatus(status) {
        try {
            await axios.put(`http://localhost:8080/requests/${request.id}?status=${status}`,
                {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

            judgement(status, request);

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {request.status === "ACCEPTED" && request.receiver.username === user.username &&
                <section className="request" key={request.id}>
                    <Link to={`/profiel/${request.sender.username}`}>
                        {request.sender.username}
                    </Link>
                    <p>{request.sender.email}</p>
                </section>}

            {request.status === "ACCEPTED" && request.sender.username === user.username &&
                <section className="request" key={request.id}>
                    <Link to={`/profiel/${request.receiver.username}`}>
                        {request.receiver.username}
                    </Link>
                    <p>{request.receiver.email}</p>
                </section>}

            {request.status === "PENDING" && request.receiver.username === user.username &&
                <section className="request" key={request.id}>
                    <Link to={`/profiel/${request.sender.username}`}>
                        {request.sender.username}
                    </Link>
                    <span className="icons">
                        <FaThumbsUp onClick={() => {
                            handleStatus("accepted")
                        }}/>
                        <FaThumbsDown onClick={() => {
                            handleStatus("declined")
                        }}/>
                    </span>
                </section>}

            {request.status === "PENDING" && request.sender.username === user.username &&
                <section className="request" key={request.id}>
                    <Link to={`/profiel/${request.receiver.username}`}>
                        {request.receiver.username}
                    </Link>
                    <span className="icons">
                        <FaExclamationTriangle onClick={() => {
                            handleStatus("cancelled")
                        }}/>
                    </span>
                </section>}

            {request.status === "DECLINED" && request.receiver.username === user.username &&
                <section className="request" key={request.id}>
                    <Link to={`/profiel/${request.sender.username}`}>
                        {request.sender.username}
                    </Link>
                </section>}

            {request.status === "CANCELLED" && request.sender.username === user.username &&
                <section className="request" key={request.id}>
                <Link to={`/profiel/${request.receiver.username}`}>
            {request.receiver.username}
                </Link>
                </section>}

        </>
    );
}

export default Request;