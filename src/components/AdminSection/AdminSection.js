import React, {useState} from "react";
import axios from "axios";


function AdminSection() {
    const [messages, setMessages] = useState([]);

    async function fetchMessages() {
        const token = localStorage.getItem('token');
        const controller = new AbortController();

        try {
            const response = await axios.get('http://localhost:8080/messages/admin', {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }, signal: controller.signal
            })
            console.log(response);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <p>Adminsectie</p>
    );
}

export default AdminSection;