import './login.css'
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import {Link} from "react-router-dom";
import Button from "../../components/button/button";

function Login({ loggedIn, toggleLoggedIn }) {
    return (
        <>
            <Header />
            <main>
                <p>Login</p>
                <Button
                    title="Log in"
                    onClick={() => {toggleLoggedIn(!loggedIn)}}
                />
                {loggedIn && <p>Je bent ingelogd</p>}
                <p>Nog geen account?</p>
                <Link to="/registration">Klik hier om je te registreren!</Link>
            </main>
            <Footer />
        </>
    );
}

export default Login;