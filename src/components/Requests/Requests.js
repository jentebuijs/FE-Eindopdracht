import React, {useContext} from 'react';
import {FaExclamationTriangle, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import {useEffect, useState} from "@types/react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Requests() {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [requests, setRequests] = useState({
        outgoing: null,
        incoming: null
    });

    useEffect(() => {
        const controller = new AbortController();

        async function fetchOutgoingRequests() {
            try {
                const response = await axios.get(`http://localhost:8080/requests/outgoing?username=${user.username}`, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }, signal: controller.signal
                });
                console.log(response.data);
                setRequests({...requests, outgoing: response.data});
            } catch (e) {
                console.error(e);
            }
        }

        fetchOutgoingRequests();
        return function cleanup() {
            controller.abort();
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchIncomingRequests() {
            try {
                const response = await axios.get(`http://localhost:8080/requests/incoming?username=${user.username}`, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }, signal: controller.signal
                });
                console.log(response.data);
                setRequests({...requests, outgoing: response.data});
            } catch (e) {
                console.error(e);
            }
        }

        fetchIncomingRequests();
        return function cleanup() {
            controller.abort();
        }
    }, []);

    function handleAccept() {
        console.log("accept");
    }

    function handleDecline() {
        console.log("decline");
    }

    function handleCancel() {
        console.log("cancel");
    }

    return (
        <>
            {requests.outgoing && requests.outgoing.map((request) => {
                return (
                    <>
                        <a to={`/profiel/${request.recipient.username}`}>{request.recipient.username}</a>
                        <FaThumbsUp onClick={handleAccept}/>
                        <FaThumbsDown onClick={handleDecline}/>
                    </>
                );
            })}

            {requests.incoming && requests.incoming.map((request) => {
                return (
                    <>
                        <a to={`/profiel/${request.sender.userName}`}>{request.sender.userName}</a>
                        <FaExclamationTriangle onClick={handleCancel}/>
                    </>
                );
            })}

        </>
    );
}

export default Requests;