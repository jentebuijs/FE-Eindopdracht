import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Request from "../Request/Request";

function RequestOverview() {
    const {user} = useContext(AuthContext);
    const [pending, setPending] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const [declined, setDeclined] = useState([]);
    const [cancelled, setCancelled] = useState([]);
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
                setPending(response.data.pending);
                setAccepted(response.data.accepted);
                setDeclined(response.data.declined);
                setCancelled(response.data.cancelled);
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

    function handleAccept(request) {
        request.status = "ACCEPTED";
        accepted.push(request);
        setPending(current => current.filter(pending => {
            return pending.id !== request.id;
        }));
    }

    function handleDecline(request) {
        request.status = "DECLINED";
        declined.push(request);
        setPending(current => current.filter(pending => {
            return pending.id !== request.id;
        }));
    }

    function handleCancel(request) {
        request.status = "CANCELLED";
        cancelled.push(request);
        setPending(current => current.filter(pending => {
            return pending.id !== request.id;
        }));
    }


    return (
        <>
            {success && <div>

                <h3>Pending</h3>
                {pending.map((request) => {
                    return <Request key={request.id} request={request} accepted={handleAccept} declined={handleDecline} cancelled={handleCancel} />
                })}

                <h3>Accepted</h3>
                {accepted.map((request) => {
                    return <Request key={request.id} request={request} />
                })}

                <h3>Declined</h3>
                {declined.map((request) => {
                    return <Request key={request.id} request={request} />
                })}

                <h3>Cancelled</h3>
                {cancelled.map((request) => {
                    return <Request key={request.id} request={request} />
                })}

            </div>}
        </>
    )

}

export default RequestOverview;