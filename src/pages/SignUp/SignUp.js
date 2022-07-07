import './SignUp.css'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import {useState} from "react";

function SignUp() {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <>
            <Header/>
            <main>
                <form className="sign-up-form">
                    <label htmlFor="username">Gebruikersnaam:</label>
                    <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="email">E-mail:</label>
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="password">Wachtwoord:</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Button type="submit" title="Registreren"/>
                </form>
            </main>
            <Footer/>
        </>
    );
}

export default SignUp;