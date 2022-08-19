import './SignIn.css'
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";
import {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Header from "../../components/Header/Header";
import React from "react";

function SignIn() {
    document.title = "DIGITAALBUDDY | Inloggen";
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function makeLoginRequest(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/users/signin', {
                username: username,
                password: password
            }, {
                headers: {
                    "Content-type": "application/json"
                }
            });
            const jwtToken = response.data;
            login(jwtToken);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Header titel="Inloggen"/>
            <div className="sign-in-container">
                <form id="sign-in-form" onSubmit={makeLoginRequest}>
                    <input
                        type="text"
                        id="username"
                        placeholder="Gebruikersnaam"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Wachtwoord"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        title="Log in"
                    />
                </form>
            </div>
            <div className="link-container">
                <p>Nog geen account?</p>
                <Link id='sign-up-link' to="/registreren">Klik hier om je te registreren!</Link>
            </div>
        </>
    );
}


export default SignIn;