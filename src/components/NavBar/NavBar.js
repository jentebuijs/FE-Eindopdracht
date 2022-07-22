import './NavBar.css'
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {
    const { isAuth, logout } = useContext(AuthContext);

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
                    <NavLink to="/profiel">Profiel</NavLink>
                </li>
                <li>
                    {isAuth ? <NavLink onClick={logout} to="/">Uitloggen</NavLink> : <NavLink to="/inloggen">Inloggen</NavLink>}
                </li>
                    {!isAuth && <li><NavLink to="/registreren">Registratie</NavLink></li> }
            </ul>
        </nav>
    );
}

export default NavBar;