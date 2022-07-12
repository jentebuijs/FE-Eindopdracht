import React from "react";

function ProfileChange() {
    return (
      <>
          <form>
              <label htmlFor="first-name">Voornaam:</label>
              <input type="text" id="first-name"/>
              <label htmlFor="last-name">Achternaam:</label>
              <input type="text" id="last-name" />
              <label htmlFor="about-me">Over mij:</label>
              <textarea id="about-me" />
              <label htmlFor="dob">Geboortedatum:</label>
              <input type="date" id="dob"/>
              <label htmlFor="contact">Contact:</label>
              <select id="contact">

              </select>
          </form>

      </>
    );
}

export default ProfileChange;