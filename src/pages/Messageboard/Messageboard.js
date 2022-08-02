import './Messageboard.css'
import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Message from "../../components/Message/Message";
import Button from "../../components/Button/Button";

function Messageboard() {
    const [messages, setMessages] = useState([]);
    const source = axios.CancelToken.source();

    useEffect(() => {
        fetchMessages();
        return function cleanup() {
            source.cancel();
        }
    }, [])

    async function fetchMessages() {
        try {
            const response = await axios.get("http://localhost:8080/messages", {
                cancelToken: source.token
            });
            setMessages(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function filterForBuddies() {
        try {
            const response = await axios.get("http://localhost:8080/messages/buddies");
            setMessages(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function filterForBoth() {
        try {
            const response = await axios.get("http://localhost:8080/messages/both-roles");
            setMessages(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function filterForStudents() {
        try {
            const response = await axios.get("http://localhost:8080/messages/students");
            setMessages(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
        <Header/>
        <main>
            <div className="buttons">
                <Button type="button"
                        title="+"/>
                <Button type="button"
                        title="Alles"
                        onClick={fetchMessages}/>
                <Button type="button"
                        title="Buddies"
                        onClick={filterForBuddies}/>
                <Button type="button"
                        title="Allebei"
                        onClick={filterForBoth}/>
                <Button type="button"
                        title="Studenten"
                        onClick={filterForStudents}/>
            </div>
            }

    {
        messages && messages.map((message) => {
            return (
                <Message key={message.id}
                         title={message.title}
                         content={message.content}/>
            );
        })
    }
</main>
    <Footer/>
</>
)
    ;
}

export default Messageboard;