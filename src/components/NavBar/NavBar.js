import './NavBar.css'
import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/prikbord">Messageboard</NavLink>
                </li>
                <li>
                    <NavLink to="/profielen">Overview</NavLink>
                </li>
                <li>
                    <NavLink to="/inloggen">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/registreren">Registratie</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;