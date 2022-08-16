import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import axios from "axios";

function Message({message}) {
    const {user: {authorities}} = useContext(AuthContext);

    async function handleStatus(status) {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:8080/messages/${message.id}?status=${status}`,
                {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h2>{message.title}</h2>
            <p>{message.content}</p>
            {authorities.includes("Admin") &&
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