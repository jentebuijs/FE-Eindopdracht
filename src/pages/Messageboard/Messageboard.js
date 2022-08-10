import './Messageboard.css'
import React, {useEffect, useState} from "react";
import Message from "../../components/Message/Message";
import Button from "../../components/Button/Button";
import axios from "axios";

function Messageboard() {
    const [messages, setMessages] = useState([]);
    const [visibleMessages, setVisibleMessages] = useState([]);

    useEffect(() => {
        const fetchController = new AbortController;
        const {signal} = fetchController;
        // const CancelToken = axios.CancelToken;
        // const source = CancelToken.source();
        async function fetchData() {
            // e.preventDefault();
            try {
                const result = await axios.get("http://localhost:8080/messages", {signal})
                    // {cancelToken: source.token})
                setMessages(result.data);
                setVisibleMessages(result.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
        return function cleanup() {
            // source.cancel();
            fetchController.abort();
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
            <div>
                {console.log(messages)}
                {console.log(visibleMessages)}
                <div className="buttons">
                    <Button type="button"
                            title="+"/>
                    <Button type="button"
                            title="Alles"
                            onClick={() => {
                                filterMessages("all")
                            }}/>
                    <Button type="button"
                            title="Buddies"
                            onClick={() => {
                                filterMessages("forBuddies")
                            }}/>
                    <Button type="button"
                            title="Allebei"
                            onClick={() => {
                                filterMessages("forBoth")
                            }}/>
                    <Button type="button"
                            title="Studenten"
                            onClick={() => {
                                filterMessages("forStudents")
                            }}/>
                </div>

                {visibleMessages && visibleMessages.map((message) => {
                    return (
                        <Message key={message.id}
                                 title={message.title}
                                 content={message.content}/>
                    );
                })}
            </div>
        </>
    );
}

export default Messageboard;
