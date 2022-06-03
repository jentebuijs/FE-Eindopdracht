import './navbar.css'
import {NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/messageboard">
                        Messageboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profiles">
                        Overview
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;