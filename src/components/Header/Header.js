import './Header.css'
import NavBar from "../NavBar/NavBar";
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";

function Header() {
    const {isAuth} = useContext(AuthContext);

    return (
        <header>
            { isAuth && <NavBar /> }
            <p>Header</p>
        </header>
    );
}

export default Header;