import './NavBar.css'
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {
    const {user, isAuth, logout} = useContext(AuthContext);

    return (
        <nav>
            {console.log(user)}
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/prikbord">Messageboard</NavLink>
                </li>
                <li>
                    {isAuth && <NavLink to="/profielen">Overview</NavLink>}
                </li>
                    {isAuth && <>
                    <li><NavLink to={`/profiel/${user.username}`}>Profiel</NavLink></li>
                    <li><NavLink to={`/profiel/${user.username}/verzoeken`}>Verzoeken</NavLink></li>
                </>}
                <li>
                    {isAuth ? <NavLink onClick={logout} to="/">Uitloggen</NavLink> :
                        <NavLink to="/inloggen">Inloggen</NavLink>}
                </li>
                    {!isAuth && <li><NavLink to="/registreren">Registratie</NavLink></li>}
            </ul>
            <ul className="usermenu">
                {isAuth && <li><h4>Hallo, {user.username}!</h4></li>}
            </ul>
        </nav>
    );
}


export default NavBar;