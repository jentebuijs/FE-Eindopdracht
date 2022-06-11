import './registration.css'
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Button from "../../components/button/button";

function Registration() {
    return (
        <>
            <Header/>
            <main>
                <form className="registration-form">
                    <label for="first-name">Voornaam:</label>
                    <input type="text" id="first-name"></input>
                    <label for="last-name">Achternaam:</label>
                    <input type="text" id="last-name"></input>
                    <Button type="submit" title="Registreren"/>
                </form>
            </main>
            <Footer/>
        </>
    );
}

export default Registration;