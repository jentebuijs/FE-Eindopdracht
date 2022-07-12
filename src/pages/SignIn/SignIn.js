import './SignIn.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function SignIn() {
    const { login } = useContext(AuthContext);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    // async function makeLoginRequest() {
    //     try {
    //         const response = await axios.post('http://localhost:8080/signin', {
    //             username: username,
    //             password: password
    //         });
    //
    //     } catch(e) {
    //         console.error(e);
    //     }
    // }

    return (
        <>
            <Header/>
            <main>
                <form className="sign-in-form">
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
                        onClick={() => {
                            console.log("logt in")
                        }}
                    />
                </form>
                <p>Nog geen account?</p>
                <Link to="/registreren">Klik hier om je te registreren!</Link>
            </main>
            <Footer/>
        </>
    );
}


export default SignIn;