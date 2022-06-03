import './navbar.css'
import {NavLink} from "react-router-dom";

function Navbar({ loggedIn, toggleLoggedIn }) {
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
                    { loggedIn && <NavLink to="/profiles">Overview</NavLink>}
                </li>
                <li>
                    { loggedIn ?
                        <NavLink exact to="/" onClick={() => {toggleLoggedIn(!loggedIn)}}>Logout</NavLink> :
                        <NavLink to="/login">Login</NavLink> }
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;