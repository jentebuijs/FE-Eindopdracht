import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Request from "../Request/Request";

function RequestOverview() {
    const {user} = useContext(AuthContext);
    const [requests, setRequests] = useState({});
    const [success, toggleSuccess] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
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
                console.log(success);
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

    function judgement(status, request) {
        setRequests({
                ...requests,
                [status]: [...requests[status], {...request, status: status.toUpperCase()}],
                pending: requests.pending.filter(pending => {
                    return pending.id !== request.id;
                })
            }
        );
    }


    //     switch (status) {
    //         case "accepted" : {
    //             setRequests({
    //                     ...requests,
    //                     [status]: [...requests[status], {...request, status : status.toUpperCase()}],
    //                     pending: requests.pending.filter(pending => {
    //                         return pending.id !== request.id;
    //                     })
    //                 }
    //             );
    //             break;
    //         }
    //         case "declined" : {
    //             setRequests({
    //                     ...requests,
    //                     declined: [...requests.declined, {...request, status : status.toUpperCase()}],
    //                     pending: requests.pending.filter(pending => {
    //                         return pending.id !== request.id;
    //                     })
    //                 }
    //             );
    //             break;
    //         }
    //         case "cancelled" : {
    //             setRequests({
    //                     ...requests,
    //                     cancelled: [...requests.cancelled, {...request, status : status.toUpperCase()}],
    //                     pending: requests.pending.filter(pending => {
    //                         return pending.id !== request.id;
    //                     })
    //                 }
    //             );
    //             break;
    //         }
    //     }
    // }

    return (
        <>
            {success && <div>

                <h3>Pending</h3>
                {requests.pending.map((request) => {
                    return <Request key={request.id} request={request} judgement={judgement}/>
                })}

                <h3>Accepted</h3>
                {requests.accepted.map((request) => {
                    return <Request key={request.id} request={request}/>
                })}

                <h3>Declined</h3>
                {requests.declined.map((request) => {
                    return <Request key={request.id} request={request}/>
                })}

                <h3>Cancelled</h3>
                {requests.cancelled.map((request) => {
                    return <Request key={request.id} request={request}/>
                })}

            </div>}
        </>
    );

}

export default RequestOverview;