import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Request from "../Request/Request";

function RequestSection() {
    const token = localStorage.getItem('token');
    const [success, toggleSuccess] = useState(false);
    const {user} = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const incoming = [];
    const outgoing = [];

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRequests() {
            try {
                const response = await axios.get(`http://localhost:8080/requests/${user.username}`, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }, signal: controller.signal
                });
                console.log(response.data);
                setRequests(response.data);
                toggleSuccess(true);
            } catch (e) {
                toggleSuccess(false);
                console.error(e);
            }
        }

        fetchRequests();
        return function cleanup() {
            controller.abort();
        }
    }, []);

    requests.map((request) => {
        if (request.receiver.username === user.username) {
            incoming.push(request);
        }
        if (request.sender.username === user.username) {
            outgoing.push(request);
        }
    })


    // useEffect(() => {
    //     requests.forEach((request) => {
    //         if (request.sender.username === user.username) {
    //             outgoing.push(request)
    //         }
    //         if (request.receiver.username === user.username) {
    //             incoming.push(request)
    //         }
    //     });
    // }, [requests]);

    return (<>

            {requests && console.log(requests)}
            <h3>Ontvangen</h3>
            <ul>
                {incoming && incoming.map((request) => {
                    return <Request request={request} incoming={true}/>
                })}
            </ul>
            <h3>Verstuurd</h3>
            <ul>
                {outgoing && outgoing.map((request) => {
                    return <Request request={request} incoming={false}/>
                })}
            </ul>
        </>
    );
}

export default RequestSection;