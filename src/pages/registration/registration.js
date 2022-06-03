import './registration.css'
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Button from "../../components/button/button";

function Registration() {
    return (
        <>
            <Header />
            <main>
                <p>Registration</p>
                <Button title="Registreren" />
            </main>
            <Footer />
        </>
    );
}

export default Registration;