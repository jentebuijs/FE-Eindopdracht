import './Messageboard.css'
import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Message from "../../components/Message/Message";
import Button from "../../components/Button/Button";

function Messageboard() {
    const [messages, setMessages] = useState([]);
    const [filterButtons, toggleFilterButtons] = useState(false);
    const [sortingButtons, toggleSortingButtons] = useState(false);

    useEffect(() => {
        async function fetchMessages() {
            const source = axios.CancelToken.source();
            try {
                const response = await axios.get("http://localhost:8080/messages", {
                    cancelToken: source.token,
                });
                setMessages(response.data);
                toggleFilterButtons(false);
                fetchMessages();


            } catch (e) {
                console.error(e);
            }
            return function cleanup() {
                source.cancel;
            }
        }
    }, [])



    async function filterForBuddies() {
        try {
            const response = await axios.get("http://localhost:8080/messages/buddies");
            setMessages(response.data);
            toggleFilterButtons(false);
        } catch (e) {
            console.error(e);
        }
    }

    async function filterForStudents() {
        try {
            const response = await axios.get("http://localhost:8080/messages/students");
            setMessages(response.data);
            toggleFilterButtons(false);
        } catch (e) {
            console.error(e);
        }
    }

    async function filterForBoth() {
        try {
            const response = await axios.get("http://localhost:8080/messages/both-roles");
            setMessages(response.data);
            toggleFilterButtons(false);
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
                            title="+" />
                    <div className="options">
                        <Button type="button"
                                title="Filteren"
                                onClick={() => toggleFilterButtons(!filterButtons)}/>
                        {filterButtons && <>
                            <Button type="button"
                                    title="Voor buddies"
                                    onClick={filterForBuddies}/>
                            <Button type="button"
                                    title="Voor studenten"
                                    onClick={filterForStudents}/>
                            <Button type="button"
                                    title="Voor buddies en studenten"
                                    onClick={filterForBoth}/>
                            {/*<Button type="button"*/}
                            {/*        title="Alles"*/}
                            {/*        onClick={fetchMessages}/>*/}
                        </>}
                    </div>
                    <div className="options">
                        <Button type="button"
                                title="Sorteren"
                                onClick={() => toggleSortingButtons(!sortingButtons)}/>
                        {sortingButtons && <>
                            <Button type="button"
                                    title="Op datum"/>
                            <Button type="button"
                                    title="Op titel"/>
                        </>}
                    </div>
                </div>
                {messages && messages.map((message) => {
                    return (
                        <Message key={message.id}
                                 title={message.title}
                                 content={message.content}/>
                    );
                })}
            </main>
            <Footer/>
        </>
    );
}

export default Messageboard;