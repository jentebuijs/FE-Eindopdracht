import './NavBar.css'
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {FaUserCircle} from "react-icons/fa";

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
                {isAuth && user.authorities.includes('ROLE_ADMIN') &&
                    <li><NavLink to={"/prikbord/admin"} activeClassName="active-link">Admin</NavLink></li>}

                {!isAuth ?
                    <>
                        <li><NavLink to="/registreren">Registratie</NavLink></li>
                        <li><NavLink to="/inloggen">Inloggen</NavLink></li>
                    </>
                    :
                    <>
                        <li><NavLink to="/profielen" activeClassName="active-navlink">Profielen</NavLink></li>
                        <li><NavLink to="/" activeClassName="active-navlink" onClick={logout}>Uitloggen</NavLink></li>
                    </>
                }
            </ul>
            <ul>
                {user && <li><NavLink to={`/profiel/${user.username}`}
                                      activeClassName="active-navlink"><FaUserCircle/>Hallo, {user.username}!</NavLink>
                </li>}
            </ul>
        </nav>
    );
}

export default NavBar;