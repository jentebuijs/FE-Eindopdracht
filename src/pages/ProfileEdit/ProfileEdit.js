import './ProfileEdit.css'
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function ProfileEdit({ profileData }) {
    const {user} = useContext(AuthContext);
    return (
      <>
          <Link to={`/profiel/${user.username}/afbeelding`}>Afbeelding aanpassen</Link>
          <form>
              <label htmlFor="first-name">Voornaam:</label>
              <input type="text" placeholder={profileData.firstName} id="first-name"/>
              <label htmlFor="last-name">Achternaam:</label>
              <input type="text" placeholder={profileData.lastName} id="last-name" />
              <label htmlFor="about-me">Over mij:</label>
              <textarea id="about-me" />
              <label htmlFor="dob">Geboortedatum:</label>
              <input type="date" id="dob" placeholder={profileData.dob}/>
          </form>
      </>
    );
}

export default ProfileEdit;