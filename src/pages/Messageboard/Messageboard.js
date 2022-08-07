// import {useEffect, useState} from 'react'
// import axios from "axios";
// import React from 'react';
//
// function Messageboard() {
//     const [messages, setMessages] = useState([]);
//
//     async function fetchData() {
//         try {
//             const result = await axios.get("http://localhost:8080/messages",
//                 {
//                     headers:
//                         {
//                             'Content-Type': 'application/json',
//                         }
//                 })
//             setMessages(result.data);
//             console.log(result.data)
//         } catch (e) {
//             console.error(e);
//         }
//     }
//
//     useEffect(() => {
//         fetchData()
//
//     }, [])
//
//     return (
//         <div className="gamecheck-container">
//             {(messages < 1) ? <h1> Er zijn geen berichten </h1> : <h1>Berichten: </h1>}
//             {messages && messages.map((message, index) => {
//                 return (
//                         <div key={index}>
//                             <h1>{message.title}
//                             </h1>
//                             <h2>
//                                 {message.content}
//                             </h2>
//                         </div>
//                 )
//             })}
//         </div>
//
//     )
// }
//
// export default Messageboard

import './Messageboard.css'
import React, {useEffect, useState} from "react";
import Message from "../../components/Message/Message";
import Button from "../../components/Button/Button";
import axios from "axios";

function Messageboard() {
    const [messages, setMessages] = useState([]);
    const [success, toggleSuccess] = useState(false);
    const [visibleMessages, setVisibleMessages] = useState([]);

    useEffect(() => {
        const fetchController = new AbortController;
        const {signal} = fetchController;
        async function fetchData() {
            try {
                const result = await axios.get("http://localhost:8080/messages", {signal})
                setMessages(result.data);
                setVisibleMessages(result.data);
                toggleSuccess(true);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
        return function cleanup() {
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
                        // <p>{message.id}</p>
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

// import './Messageboard.css'
// import React, {useEffect, useState} from "react";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import axios from "axios";
// import Message from "../../components/Message/Message";
// import Button from "../../components/Button/Button";
//
// function Messageboard() {
//     const [messages, setMessages] = useState([]);
//
//     useEffect(() => {
//         const fetchController = new AbortController;
//         const {signal} = fetchController;
//
//         async function fetchMessages() {
//             try {
//                 const response = await axios.get("http://localhost:8080/messages", {signal});
//                 setMessages(response.data);
//             } catch (e) {
//                 console.error(e);
//             }
//         }
//
//         fetchMessages();
//
//         return function cleanup() {
//             console.log("abort");
//             fetchController.abort();
//         }
//     }, [])
//
//
//     async function filterForBuddies() {
//         try {
//             const response = await axios.get("http://localhost:8080/messages/buddies");
//             setMessages(response.data);
//         } catch (e) {
//             console.error(e);
//         }
//     }
//
//     async function filterForBoth() {
//         try {
//             const response = await axios.get("http://localhost:8080/messages/both");
//             setMessages(response.data);
//         } catch (e) {
//             console.error(e);
//         }
//     }
//
//     async function filterForStudents() {
//         try {
//             const response = await axios.get("http://localhost:8080/messages/students");
//             setMessages(response.data);
//         } catch (e) {
//             console.error(e);
//         }
//     }
//
//     return (
//         <>
//             {console.log(messages)}
//             {messages && messages.map((message) => {
//                 return (
//                     <Message key={message.id}
//                              title={message.title}
//                              content={message.content}/>
//                 );
//             })
//             }
//         </>
//     )
//         ;
// }
//
// export default Messageboard;

// import './Messageboard.css'
// import React, {useEffect, useState} from "react";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import axios from "axios";
// import Message from "../../components/Message/Message";
// import Button from "../../components/Button/Button";
//
// function Messageboard() {
    // const [success, toggleSuccess] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const [visibleMessages, setVisibleMessages] = useState([]);
//
//     useEffect(() => {
//         const fetchController = new AbortController;
//         const {signal} = fetchController;
//
//         async function fetchMessages() {
//             try {
//                 const response = await axios.get("http://localhost:8080/messages", {signal});
//                 console.log(response.data);
//                 setMessages(response.data);
//                 // toggleSuccess(true);
//             } catch (e) {
//                 console.error(e);
//             }
//         }
//         fetchMessages();
//         setVisibleMessages(messages);
//         console.log(messages);
//         console.log(visibleMessages);
//         return function cleanup() {
//             console.log("abort");
//             fetchController.abort();
//         }
//     }, [])
//
//     function filterMessages(messageType) {
//         if (messageType === "forBuddies") {
//             setVisibleMessages(messages.filter((message) => {
//                 return (message.forBuddy === true && message.forStudent === false);
//             }));
//         }
//         if (messageType === "forStudents") {
//             setVisibleMessages(messages.filter((message) => {
//                 return (message.forBuddy === false && message.forStudent === true);
//             }));
//         }
//         if (messageType === "forBoth") {
//             setVisibleMessages(messages.filter((message) => {
//                 return (message.forBuddy === true && message.forStudent === true);
//             }));
//         }
//         if (messageType === "all") {
//             setVisibleMessages(messages);
//         }
//     }
//
//     return (
//         <>
//                 <div className="buttons">
//                     <Button type="button"
//                             title="+"/>
//                     <Button type="button"
//                             title="Alles"
//                             onClick={() => filterMessages("all")}/>
//                     <Button type="button"
//                             title="Buddies"
//                             onClick={() => filterMessages("forBuddies")}/>
//                     <Button type="button"
//                             title="Allebei"
//                             onClick={() => filterMessages("forBoth")}/>
//                     <Button type="button"
//                             title="Studenten"
//                             onClick={() => filterMessages("forStudents")}/>
//                 </div>
//
//                 { visibleMessages && visibleMessages.map((message) => {
//                         return (
//                             <Message key={message.id}
//                                      title={message.title}
//                                      content={message.content}/>
//                         );
//                     })
//                 }
//         </>
//     )
//         ;
// }
//
// export default Messageboard;