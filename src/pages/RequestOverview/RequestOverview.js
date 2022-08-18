import './RequestOverview.css'
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Request from "../../components/Request/Request";
import {FaAngleDoubleDown, FaAngleDoubleUp} from "react-icons/fa";

function RequestOverview() {
    const {user} = useContext(AuthContext);
    const [requests, setRequests] = useState({});
    const [success, toggleSuccess] = useState(false);
    const [status, toggleStatus] = useState({
        openAccepted: false,
        openPending: false,
        openDeclined: false,
        openCancelled: false
    });

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRequests() {
            try {
                const response = await axios.get(`http://localhost:8080/requests/${user.username}`, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }, signal: controller.signal
                });

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

    return (
        <>
            { success &&
                <>
                <section>
                    <span className="box-title">
                        <h4  onClick={() => {
                            toggleStatus({
                                ...status,
                                openAccepted: !status.openAccepted
                            })
                        }}>Accepted</h4>
                        {!status.openAccepted && <p>{requests.accepted.length} berichten</p>}
                    </span>
                    <div>
                        {status.openAccepted && requests.accepted.map((request) => {
                            return <Request key={request.id} request={request}/>
                        })}
                    </div>
                </section>

                <section>
                    <span className="box-title">
                        <h3 onClick={() => {
                                toggleStatus({
                                ...status,
                                openPending : !status.openPending})
                            }}>Pending</h3>
                        {!status.openPending && <p>{requests.pending.length} berichten</p>}
                    </span>
                    <div>
                        {status.openPending && requests.pending.map((request) => {
                            return <Request key={request.id} request={request} judgement={judgement}/>
                        })}
                    </div>
                </section>

                <section>
                    <span className="box-title">
                        <h3 onClick={() => {
                                toggleStatus({
                                ...status,
                                openDeclined : !status.openDeclined})
                            }}>Declined</h3>
                        {!status.openDeclined && <p>{requests.declined.length} berichten</p>}
                    </span>
                    <div>
                        {status.openDeclined && requests.declined.map((request) => {
                            return <Request key={request.id} request={request} judgement={judgement}/>
                        })}
                    </div>
                </section>

                <section>
                    <span className="box-title">
                        <h3 onClick={() => {
                                toggleStatus({
                                ...status,
                                openCancelled : !status.openCancelled})
                            }}>Cancelled</h3>
                        {!status.openCancelled && <p>{requests.cancelled.length} berichten</p>}
                    </span>
                    <div>
                        {status.openCancelled && requests.cancelled.map((request) => {
                            return <Request key={request.id} request={request} judgement={judgement}/>
                        })}
                    </div>
                </section>
                </>}
        </>
    );
}

export default RequestOverview;