import './NewMessage.css';
import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

function NewMessage() {
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');

    async function addMessage() {
        try {
            const response = await axios.post('http://localhost:8080/messages/new', {
                // title: {title},
                // content: {content},
                approved: false,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                // Authorization: `Bearer ${token}`
            })
            addMessage();
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <p>Hallo</p>
    );
}

export default NewMessage;