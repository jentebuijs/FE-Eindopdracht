import './SignUp.css'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import {useContext, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

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
                        { authorities === "Student" && <span>
                        <label htmlFor="level">Nederlands niveau:</label>
                        <select name="level" id="level" onChange={(e) => setLevel(e.target.value)}>
                            <option value="BEGINNER">Beginner - A1</option>
                            <option value="ELEMENTARY">Beginner -A2</option>
                            <option value="INTERMEDIATE">Gevorderd - B1</option>
                            <option value="UPPER_INTERMEDIATE">Gevorderd - B2</option>
                            <option value="ADVANCED">Vergevorderd - C1</option>
                            <option value="PROFICIENT">Vergevorderd - C2</option>
                        </select>
                            <p>Weet je nog niet wat je taalniveau is?
                                <a to="https://detaalbrigade.nl/taalniveaus/">Klik hier</a> voor meer informatie in het Nederlands</p>
                            <p>Are you not sure about your language level?
                                <a to="https://www.fluentin3months.com/cefr-levels/">Click here</a> for more information in English</p>
                        </span> }
                        <label htmlFor="personal">Over mij:</label>
                        <input type="text" id="personal" onChange={(e) => setAboutMe(e.target.value)}/>
                        {authorities === "Student" ? <label htmlFor="frequency">Hoe vaak wil je contact hebben met je Buddy?</label> : <label htmlFor="frequency">Hoe vaak wil je contact hebben met je Student?</label>}
                        <select name="frequency" id="frequency" onChange={(e) => setFrequency(e.target.value)}>
                            <option value="EVERY_DAY">Elke dag</option>
                            <option value="ONCE_A_WEEK">Een keer per week</option>
                            <option value="FEW_TIMES_A_WEEK">Een paar keer per week</option>
                            <option value="ONCE_A_MONTH">Een keer per maand</option>
                            <option value="FEW_TIMES_A_MONTH">Een paar keer per maand</option>
                        </select>
                    </fieldset>
                    <Button type="submit" title="Registreren"/>
                </form>
        </>
    );
}

export default SignUp;