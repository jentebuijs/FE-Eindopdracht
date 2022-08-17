import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import axios from "axios";

function Message({message, judgement}) {
    const {user, isAuth} = useContext(AuthContext);

    async function handleStatus(status) {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:8080/messages/${message.id}/update?status=${status}`, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
            judgement(message, status);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h2>{message.title}</h2>
            <p>{message.content}</p>
            {isAuth && user.authorities.includes("ROLE_ADMIN") && message.approved === false &&
                <span>
                <FaThumbsUp onClick={() => {
                    handleStatus("accepted")
                }}/>
                <FaThumbsDown onClick={() => {
                    handleStatus("declined")
                }}/>
                    </span>
            }
        </>
    );
}

export default Message;