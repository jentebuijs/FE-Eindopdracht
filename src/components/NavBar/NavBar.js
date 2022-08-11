import './NavBar.css'
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {
    const {user, isAuth, logout} = useContext(AuthContext);

    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/" activeClassName="active-navlink">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/prikbord" activeClassName="active-navlink">Prikbord</NavLink>
                </li>
                { !isAuth && <>
                    <li><NavLink to="/registreren">Registratie</NavLink></li>
                    <li><NavLink to="/inloggen">Inloggen</NavLink></li></> }
                { isAuth && <>
                    <li><NavLink to="/profielen" activeClassName="active-navlink">Profielen</NavLink></li>
                    <li><NavLink to="/" activeClassName="active-navlink" onClick={logout} >Uitloggen</NavLink></li></> }
            </ul>
            <ul>
                { user && <li><NavLink to={`/profiel/${user.username}`} activeClassName="active-navlink">Hallo, {user.username}!</NavLink></li>}
            </ul>
        </nav>
    );
}

export default NavBar;