import './SignUp.css'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authorities, setAuthorities] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [level, setLevel] = useState('');
    const [frequency, setFrequency] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const {history} = useHistory();

    async function addNewUser(e) {
        e.preventDefault();
        console.log(username, email, password, authorities);
        try {
            const response = await axios.post('http://localhost:8080/users/signup', {
                username: username,
                email: email,
                password: password,
                authorities: authorities
            })
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
                <form className="sign-up-form" onSubmit={addNewUser}>
                    <fieldset>
                        <legend>Account:</legend>
                        <label htmlFor="username">Gebruikersnaam:</label>
                        <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="password">Wachtwoord:</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        <div>
                            <p>Ik wil mij aanmelden als:</p>
                            <input type="radio" name="authorities" value="Buddy" id="userrole1" defaultChecked
                                   onChange={() => setAuthorities("Buddy")}/>
                            <label htmlFor="userrole1">Buddy</label>
                            <input type="radio" name="authorities" value="Student" id="userrole2"
                                   onChange={() => setAuthorities("Student")}/>
                            <label htmlFor="userrole2">Student</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Profiel:</legend>
                        <label htmlFor="fname">Voornaam:</label>
                        <input type="text" id="fname" onChange={(e) => setFirstName(e.target.value)}/>
                        <label htmlFor="lname">Achternaam:</label>
                        <input type="text" id="lname" onChange={(e) => setLastName(e.target.value)}/>
                        <label htmlFor="dob">Geboortedatum:</label>
                        <input type="text" id="dob" onChange={(e) => setDob(e.target.value)}/>
                        { authorities === "Student" && <>
                        <label htmlFor="level">Taalniveau:</label>
                        <select name="level" id="level">
                            <option value=""></option>
                        </select>
                        </> }

                    </fieldset>
                    <Button type="submit" title="Registreren"/>
                </form>
        </>
    );
}

export default SignUp;