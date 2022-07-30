import './Messageboard.css'
import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Message from "../../components/Message/Message";

function Messageboard() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await axios.get("http://localhost:8080/messages");
                setMessages(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        fetchMessages();
    }, [])


    return (
        <>
            <Header/>
            <main>
                {messages && messages.map((message) => {
                    return (
                        <Message    key={message.id}
                                    title={message.title}
                                    content={message.content} />
                    );
                })}
            </main>
            <Footer/>
        </>
    );
}

export default Messageboard;