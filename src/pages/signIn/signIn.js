import './signIn.css'
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import {Link} from "react-router-dom";
import Button from "../../components/button/button";
import {useState} from "react";

function SignIn() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <>
            <Header/>
            <main>
                <form className="login-form">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        title="Log in"
                        onClick={() => {
                            <p>Hallo, {username}</p>
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