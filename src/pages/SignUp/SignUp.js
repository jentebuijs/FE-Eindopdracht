import './SignUp.css'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import {useState} from "react";

function SignUp() {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isStudent, toggleIsStudent ] = useState(false);


    // async function addNewUser(){
    //     try {
    //         const response = await axios.post('http://localhost:8080/signup', {
    //             username: username,
    //             email: email,
    //             password: password,
    //             isStudent : ???
    //         })
    //     } catch(e) {
    //         console.error(e);
    //     }
    // }

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
                    <div>
                        <p>Ik wil mij aanmelden als:</p>
                        <input type="radio" name="userrole" value="buddy" id="userrole1" checked/>
                        <label htmlFor="userrole1">Buddy</label>
                        <input type="radio" name="userrole" value="student" id="userrole2"/>
                        <label htmlFor="userrole2">Student</label>
                    </div>
                    <Button type="submit" title="Registreren"/>
                </form>
            </main>
            <Footer/>
        </>
    );
}

export default SignUp;