import './Header.css'
import NavBar from "../NavBar/NavBar";

function Header() {

    return (
        <header>
            <NavBar/>
            <span>
                <img src="../../assets/logo.JPG" alt="logo"/>
            </span>
        </header>
    );
}

export default Header;