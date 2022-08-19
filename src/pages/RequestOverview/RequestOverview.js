import './RequestOverview.css'
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Request from "./Request/Request";
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
            {success &&
                <>
                    <div className="title-container">
                        <h3>Jouw vriendschapsverzoeken</h3>
                    </div>
                    <section>
                    <span className="box-title">
                        <p onClick={() => {
                            toggleStatus({
                                ...status,
                                openAccepted: !status.openAccepted
                            })
                        }}>Accepted</p>
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
                        <p onClick={() => {
                            toggleStatus({
                                ...status,
                                openPending: !status.openPending
                            })
                        }}>Pending</p>
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
                        <p onClick={() => {
                            toggleStatus({
                                ...status,
                                openDeclined: !status.openDeclined
                            })
                        }}>Declined</p>
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
                        <p onClick={() => {
                            toggleStatus({
                                ...status,
                                openCancelled: !status.openCancelled
                            })
                        }}>Cancelled</p>
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