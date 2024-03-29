import './NewRequest.css'
import Button from "../../../components/Button/Button";
import React, {useState} from "react";
import axios from "axios";
import {NotificationManager} from "react-notifications";

function NewRequest({sender, receiver, toggleNewRequest, borderColor}) {
    const [message, setMessage] = useState('Hallo! Wil je met mij mailen?');

    async function sendRequest(e) {
        e.preventDefault()
        const controller = new AbortController();

        try {
            await axios.post('http://localhost:8080/requests/new', {
                sender: sender,
                receiver: receiver,
                message: message
            }, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }, signal: controller.signal
            }).then(() => {
                NotificationManager.success('Je bericht is verstuurd', 'Sweet success!', 1500)
                toggleNewRequest(false);
            });

        } catch (e) {
            console.error(e);
            NotificationManager.error('Probeer het opnieuw', 'Er is iets misgegaan!', 1500);
        }
    }

    return (
        <>
            <form className="new-request-form"
                  style={{borderColor: borderColor}}
                  onSubmit={sendRequest}>
                <label htmlFor="message">Uw bericht:</label>
                <textarea id="message"
                          rows="4"
                          placeholder="Hallo! Wil je met mij mailen?"
                          onChange={(e) => setMessage(e.target.value)}/>
                <Button type="submit" title="Verstuur"/>
            </form>
        </>
    );
}

export default NewRequest;