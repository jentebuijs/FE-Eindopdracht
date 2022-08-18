import './Home.css'
import React from "react";
import Header from "../../components/Header/Header";

function Home() {
    document.title = "DIGITAALBUDDY | Home";

    return (
        <>
            <Header titel="Home" />
                <h1>Welkom!</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi distinctio, eaque in iure iusto
                    minima, nemo neque nihil nulla perspiciatis placeat possimus praesentium qui quia quidem quisquam
                    quo, ullam vero?</p>
        </>
    );
}

export default Home;