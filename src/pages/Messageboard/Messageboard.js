import './Messageboard.css'
import {FaPlusCircle} from "react-icons/fa";
import React, {useContext, useEffect, useState} from "react";
import Message from "../../components/Message/Message";
import Button from "../../components/Button/Button";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import NewMessage from "../../components/NewMessage/NewMessage";
import {NotificationManager} from "react-notifications";
import Header from "../../components/Header/Header";

function Messageboard() {
    document.title = "DIGITAALBUDDY | Prikbord";
    const {isAuth} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [newMessage, toggleNewMessage] = useState(false);
    const [titleColor, setTitleColor] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8080/messages",
                    {
                        headers: {
                            "Content-type": "application/json"
                        },
                        signal: controller.signal
                    });

                setMessages(response.data);
                setVisibleMessages(response.data);

            } catch (e) {
                console.error(e);
                NotificationManager.warning('Probeer het opnieuw', 'Er ging wat mis!', 1500);
            }
        }

        fetchData();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    function filterMessages(messageType) {
        if (messageType === "forBuddies") {
            setVisibleMessages(messages.filter((message) => {
                return (message.forBuddy === true && message.forStudent === false);
            }));
        }
        if (messageType === "forStudents") {
            setVisibleMessages(messages.filter((message) => {
                return (message.forBuddy === false && message.forStudent === true);
            }));
        }
        if (messageType === "forBoth") {
            setVisibleMessages(messages.filter((message) => {
                return (message.forBuddy === true && message.forStudent === true);
            }));
        }
        if (messageType === "all") {
            setVisibleMessages(messages);
        }
    }

    return (
        <>
            <Header titel="Prikbord"/>
            <span className="buttons">
                    {isAuth &&
                        <FaPlusCircle
                            size='20px'
                            color='black'
                            onClick={() => {
                                toggleNewMessage(!newMessage)
                            }}/>}
                <Button type="button"
                        title="Alles"
                        classname="all-button"
                        onClick={() => {
                            filterMessages("all")
                        }}/>
                <Button type="button"
                        title="Studenten"
                        classname="student-button"
                        onClick={() => {
                            filterMessages("forStudents")
                        }}/>
                <Button type="button"
                        title="Allebei"
                        classname="both-button"
                        onClick={() => {
                            filterMessages("forBoth")
                        }}/>
                <Button type="button"
                        title="Buddies"
                        classname="buddy-button"
                        onClick={() => {
                            filterMessages("forBuddies")
                        }}/>

                </span>

            {isAuth && newMessage && <NewMessage newMessage={newMessage} toggleNewMessage={toggleNewMessage}/>}

            <div className="message-container">
                {visibleMessages && visibleMessages.map((message) => {
                    return (
                        <Message key={message.id} message={message}/>
                    );
                })}
            </div>
        </>
    );
}

export default Messageboard;
