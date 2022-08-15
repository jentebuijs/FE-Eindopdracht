import './SignIn.css'
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useHistory} from "react-router-dom";

function SignIn() {
    const { login } = useContext(AuthContext);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    async function makeLoginRequest(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/signin', {
                username: username,
                password: password
            });
            console.log(response);
            const jwtToken = response.data;
            login(jwtToken);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <>
                <form className="sign-in-form" onSubmit={makeLoginRequest}>
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
                <p>Nog geen account?</p>
                <Link to="/registreren">Klik hier om je te registreren!</Link>
        </>
    );
}

export default SignIn;