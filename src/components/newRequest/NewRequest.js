import './NewRequest.css'
import Button from "../Button/Button";
import React, {useState} from "react";
import axios from "axios";

function NewRequest({sender, receiver}) {
    const [message, setMessage] = useState('');
    const [success, toggleSuccess] = useState(false);

    async function sendRequest(e) {
        e.preventDefault()
        const token = localStorage.getItem('token');
        const controller = new AbortController();

        try {
            const response = await axios.post('http://localhost:8080/requests/new', {
                sender: sender,
                receiver: receiver,
                message: message
            }, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }, signal: controller.signal
            })
            console.log(response);
            { response && toggleSuccess(!success) }
        } catch (e) {
            console.error(e);
        }
        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <>
            {!success ?
                <form onSubmit={sendRequest}>
                    <label htmlFor="message">Uw bericht:</label>
                    <textarea id="message"
                              onChange={(e) => setMessage(e.target.value)}/>
                    <Button type="submit" title="Verstuur"/>
                </form>
                :
                <p>Uw verzoek is verstuurd!</p>
            }
        </>
    )
        ;
}

export default NewRequest;