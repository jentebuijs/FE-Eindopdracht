import './Request.css'
import {FaExclamationTriangle, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import React from "react";
import {Link} from "react-router-dom";

function Request({request, incoming}) {

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
        <li className="request" key={request.id}>
            { incoming ?
                <div>
                    <Link to={`/profiel/${request.sender.username}`}>
                        {request.sender.username}
                    </Link>
                    <span>
                        <FaThumbsUp onClick={handleAccept}/>
                        <FaThumbsDown onClick={handleDecline}/>
                    </span>
                </div>
                :
                <div>
                    <Link to={`/profiel/${request.receiver.username}`}>
                        {request.receiver.username}
                    </Link>
                    <span>
                        <FaExclamationTriangle onClick={handleCancel}/>
                    </span>
                </div>
            }
        </li>
    );


}

export default Request;