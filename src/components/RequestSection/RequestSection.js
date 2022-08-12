import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Request from "../Request/Request";

function RequestSection() {
    const token = localStorage.getItem('token');
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

                requests.forEach((request) => {
                    {
                        request.sender.username === user.username && outgoing.push(request)
                    }
                    {
                        request.receiver.username === user.username && incoming.push(request)
                    }
                });
                    console.log(outgoing)
                    console.log(incoming)
            } catch (e) {
                console.error(e);
            }
        }

        fetchRequests();
        return function cleanup() {
            controller.abort();
        }
    }, []);

    return ( <>
    {
        console.log(outgoing)
    }
    {
        console.log(incoming)
    }
        </>
    // <>
    //     <h3>Ontvangen</h3>
    //     <ul>
    //         {incoming && incoming.map((request) => {
    //             return (
    //                 <Request request={request} incoming={true}/>
    //             );
    //         })}
    //     </ul>
    //
    //     <h3>Verzonden</h3>
    //     <ul>
    //         {outgoing && outgoing.map((request) => {
    //             return (
    //                 <Request request={request} incoming={false} />
    //             );
    //         })}
    //     </ul>
    // </>
)
    ;
}

export default RequestSection;