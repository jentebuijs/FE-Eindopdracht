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
    })

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
            {success && <div>
                <section>
                    <h3>
                        <button type="button"
                                onClick={() => {
                                    toggleStatus({
                                        ...status,
                                        openAccepted : !status.openAccepted})
                                }}>
                            {status.openAccepted
                                ?
                                <FaAngleDoubleUp />
                                :
                                <FaAngleDoubleDown />
                            }
                        </button>
                        Accepted
                        {!status.openAccepted &&
                        <p>{requests.accepted.length}</p>}
                    </h3>
                    <div>
                        {status.openAccepted && requests.accepted.map((request) => {
                            return <Request key={request.id} request={request}/>
                        })}
                    </div>
                </section>

                <section>
                    <h3>
                        <button type="button"
                                onClick={() => {
                                    toggleStatus({
                                        ...status,
                                        openPending : !status.openPending})
                                }}>
                            {status.openPending
                                ?
                                <FaAngleDoubleUp />
                                :
                                <FaAngleDoubleDown />
                            }
                        </button>
                        Pending
                        {!status.openPending &&
                            <p>{requests.pending.length}</p>}
                    </h3>

                    <div>
                        {status.openPending && requests.pending.map((request) => {
                            return <Request key={request.id} request={request} judgement={judgement}/>
                        })}
                    </div>
                </section>

                <section>
                    <h3>
                        <button type="button"
                                onClick={() => {
                                    toggleStatus({
                                        ...status,
                                        openDeclined : !status.openDeclined})
                                }}>
                            {status.openDeclined
                                ?
                                <FaAngleDoubleUp />
                                :
                                <FaAngleDoubleDown />
                            }
                        </button>
                        Declined
                        {!status.openDeclined &&
                            <p>{requests.declined.length}</p>}
                    </h3>

                    <div>
                        {status.openDeclined && requests.declined.map((request) => {
                            return <Request key={request.id} request={request} judgement={judgement}/>
                        })}
                    </div>
                </section>

                <section>
                    <h3>
                        <button type="button"
                                onClick={() => {
                                    toggleStatus({
                                        ...status,
                                        openCancelled : !status.openCancelled})
                                }}>
                            {status.openCancelled
                                ?
                                <FaAngleDoubleUp />
                                :
                                <FaAngleDoubleDown />
                            }
                        </button>
                        Cancelled
                        {!status.openCancelled &&
                            <p>{requests.cancelled.length}</p>}
                    </h3>

                    <div>
                        {status.openCancelled && requests.cancelled.map((request) => {
                            return <Request key={request.id} request={request} judgement={judgement}/>
                        })}
                    </div>
                </section>

            </div>}
        </>
    );

}

export default RequestOverview;