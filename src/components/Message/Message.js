import './Message.css';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import axios from "axios";

function Message({message, judgement}) {
    const {user, isAuth} = useContext(AuthContext);
    const [titleColor, setTitleColor] = useState('#FFFFFF');

    useEffect(() => {
        if (message.forBuddy === true && message.forStudent === false) {
            setTitleColor('#FFD600');
        } else if (message.forBuddy === false && message.forStudent === true) {
            setTitleColor('#C80000');
        } else if (message.forBuddy === true && message.forStudent === true) {
            setTitleColor('#FCA016');
        }
    }, [])

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
            <div className="message-bar" style={{color: titleColor}}>
                <p id="message-title">{message.title}</p>
                { isAuth && user.authorities.includes("ROLE_ADMIN") && message.approved === false &&
                    <span id="admin-icons">
                    <FaThumbsUp onClick={() => {
                        handleStatus("accepted")
                    }}/>

                    <FaThumbsDown onClick={() => {
                        handleStatus("declined")
                    }}/>
                </span> }
            </div>
            <p>{message.content}</p>

        </>
    )
        ;
}

export default Message;