import './NewMessage.css';
import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import Button from "../Button/Button";

function NewMessage() {
    const token = localStorage.getItem('token');
    const [success, toggleSuccess] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function addMessage(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/messages/new', {
                title: title,
                content: content,
                approved: false,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                Authorization: `Bearer ${token}`
            })
            addMessage();
            console.log(response);
            {response && toggleSuccess(true)}
        } catch (e) {
            toggleSuccess(false)
            console.error(e);
        }
    }

    return (
        <>
            {!success ?
                <form onSubmit={addMessage}>
                    <label htmlFor="title">Titel:</label>
                    <input type="text"
                           id="title"
                           onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="content">Inhoud:</label>
                    <textarea id="content"
                              onChange={(e) => setContent(e.target.value)}/>
                    <Button type="submit" title="Verstuur"/>
                </form>
                :
                <p>Uw bericht is verstuurd. Zodra onze Admin hem goedkeurt, kunt u hem terugvinden op het prikbord</p>}
        </>
    );
}

export default NewMessage;