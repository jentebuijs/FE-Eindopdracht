import './Header.css'
import logo from '../../assets/logo.JPG';

function Header({titel}) {

    return (
        <div className="container">
            <div className="image-wrapper">
                <img src={logo} alt="logo"/>
            </div>
            <h2>{titel}</h2>
        </div>

    );
}

export default Header;