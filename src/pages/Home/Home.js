import './Home.css'
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Home() {
    return (
        <>
            <Header/>
            <main>
                <h1>Welkom!</h1>
                <p>Blablabla</p>
            </main>
            <Footer/>
        </>
    );
}

export default Home;