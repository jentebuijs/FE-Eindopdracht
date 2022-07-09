import './Overview.css'
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

function Overview() {

    async function getProfiles() {
        try {
            const response = await axios.get('http://localhost:8080/profiles');
            console.log(response)
        } catch(e) {
            console.error(e);
        }
    }



    return (
        <>
            <Header/>
            <main>
                <p>Overview</p>
                <button onClick={getProfiles}>getProfiles</button>
            </main>
            <Footer/>
        </>
    );
}

export default Overview;