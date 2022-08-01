import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function ProfileChange() {
    const {user: {username}} = useContext(AuthContext);
    return (
      <>
          <Link to={`/profiel/${username}/afbeelding`}>Afbeelding aanpassen</Link>
          <form>
              <label htmlFor="first-name">Voornaam:</label>
              <input type="text" id="first-name"/>
              <label htmlFor="last-name">Achternaam:</label>
              <input type="text" id="last-name" />
              <label htmlFor="about-me">Over mij:</label>
              <textarea id="about-me" />
              <label htmlFor="dob">Geboortedatum:</label>
              <input type="date" id="dob"/>
          </form>

      </>
    );
}

export default ProfileChange;