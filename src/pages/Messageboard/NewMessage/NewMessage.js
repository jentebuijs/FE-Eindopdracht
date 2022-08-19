import './NewMessage.css';
import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import Button from "../../../components/Button/Button";
import {NotificationManager} from "react-notifications";

function NewMessage({newMessage, toggleNewMessage}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function addMessage(e) {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/messages/new', {
                title: title,
                content: content,
                approved: false,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(() => {
                NotificationManager.success('Je bericht is verstuurd. Zodra de Admin hem goedkeurt, is hij te vinden ' +
                    'op het prikbord.', 'Sweet success!', 1500);
                toggleNewMessage(false);
            });

            addMessage();

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
                <form onSubmit={addMessage} className="new-message-container">
                    <input type="text"
                           id="title"
                           placeholder="Titel"
                           onChange={(e) => setTitle(e.target.value)}/>
                    <textarea id="content"
                              placeholder="Bericht"
                              onChange={(e) => setContent(e.target.value)}/>
                    <div>
                        <input type="checkbox" id="buddy" name="buddy" value="buddy"/>
                        <label htmlFor="buddy">Voor buddies</label>
                        <br />
                        <input type="checkbox" id="student" name="student" value="student"/>
                        <label htmlFor="student">Voor studenten</label>
                    </div>
                    <Button type="submit" title="Verstuur"/>
                </form>
        </>
    );
}

export default NewMessage;