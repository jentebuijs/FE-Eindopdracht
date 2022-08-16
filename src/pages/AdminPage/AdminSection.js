import React, {useEffect, useState} from "react";
import axios from "axios";
import {set} from "react-hook-form";
import Message from "../../components/Message/Message";


function AdminSection() {
    document.title = "DIGITAALBUDDY | Adminpagina"
    const [adminMessages, setAdminMessages] = useState([]);

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
                setAdminMessages(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchAdminMessages();
    }, []);

    function judgement(message) {
        setAdminMessages(
            adminMessages.filter(adminMessage => {
                return adminMessage.id !== message.id;
            })
        )
    }


    return (
        <>
            {adminMessages && adminMessages.map((message) => {
                return (
                    <Message key={message.id} message={message} judgement={judgement} />
                );
            })}
        </>
    );
}

export default AdminSection;