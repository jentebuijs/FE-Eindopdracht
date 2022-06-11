import './home.css'
import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

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