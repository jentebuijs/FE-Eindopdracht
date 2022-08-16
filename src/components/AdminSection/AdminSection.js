import React, {useEffect, useState} from "react";
import axios from "axios";
import {set} from "react-hook-form";
import Message from "../Message/Message";


function AdminSection() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchAdminMessages() {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get("http://localhost:8080/messages?type=admin", {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                setMessages(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchAdminMessages();
    }, []);

    return (
        <>
            { messages && messages.map((message) => {
                return (
                    <Message key={message.id} message={message}/>
                );
            }) }
        </>
    );
}

export default AdminSection;