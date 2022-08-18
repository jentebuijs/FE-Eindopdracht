import React, {useEffect, useState} from "react";
import axios from "axios";
import Message from "../../components/Message/Message";
import {NotificationManager} from "react-notifications";
import Header from "../../components/Header/Header";

function AdminSection() {
    document.title = "DIGITAALBUDDY | Adminpagina"
    const [adminMessages, setAdminMessages] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAdminMessages() {
            try {
                const response = await axios.get("http://localhost:8080/messages?type=admin", {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }, signal: controller.signal
                });

                setAdminMessages(response.data);

            } catch (e) {
                console.error(e);
                NotificationManager.warning('Probeer het opnieuw', 'Er ging wat mis!', 1500);
            }
        }
            fetchAdminMessages();

            return function cleanup() {
                controller.abort();
            }
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
            <Header titel="Admin" />
            {adminMessages && adminMessages.map((message) => {
                return (
                    <Message key={message.id} message={message} judgement={judgement} />
                );
            })}
        </>
    );
}

export default AdminSection;