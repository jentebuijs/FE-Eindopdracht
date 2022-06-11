import './login.css'
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import {Link} from "react-router-dom";
import Button from "../../components/button/button";

function Login() {
    return (
        <>
            <Header/>
            <main>
                <form className="login-form">
                    <input
                        type="text"
                        id="username/email"
                        placeholder="Username or email"
                    ></input>
                    <input
                        type="text"
                        id="password"
                        placeholder="Password"
                    ></input>
                    <Button
                        type="submit"
                        title="Log in"
                        onClick={() => {
                            console.log("logt in")
                        }}
                    />
                </form>
                <p>Nog geen account?</p>
                <Link to="/registration">Klik hier om je te registreren!</Link>
            </main>
            <Footer/>
        </>
    );
}


export default Login;