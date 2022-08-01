import './SignUp.css'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import {useState} from "react";
import axios from "axios";

function SignUp() {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isStudent, toggleIsStudent ] = useState(false);


    async function addNewUser(e){
        e.preventDefault();
        console.log(username, email, password, isStudent);
        try {
            const response = await axios.post('http://localhost:8080/users/signup', {
                username: username,
                email: email,
                password: password,
                isStudent : isStudent
            })
            console.log(response);
        } catch(e) {
            console.error(e);
        }
    }

    function handleCheck(e) {
        if(e.target.value === "Buddy") {
            toggleIsStudent(false);
        } else {
            toggleIsStudent(true);
        }
    }

    return (
        <>
            <Header/>
            <main>
                <form className="sign-up-form" onSubmit={addNewUser}>
                    <label htmlFor="username">Gebruikersnaam:</label>
                    <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="email">E-mail:</label>
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="password">Wachtwoord:</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    <div>
                        <p>Ik wil mij aanmelden als:</p>
                        <input type="radio" name="userrole" value="Buddy" id="userrole1" defaultChecked onClick={handleCheck}/>
                        <label htmlFor="userrole1">Buddy</label>
                        <input type="radio" name="userrole" value="Student" id="userrole2" onClick={handleCheck}/>
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