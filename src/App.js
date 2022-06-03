import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./pages/home/home";
import Messageboard from "./pages/messageboard/messageboard";
import Overview from "./pages/overview/overview";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
import {useState} from "react";
import Navbar from "./components/navbar/navbar";

function App() {
    const [loggedIn, toggleLoggedIn] = useState(false);

    return (
        <>
            <Navbar
                loggedIn={loggedIn}
                toggleLoggedIn={toggleLoggedIn}
            />
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/messageboard">
                    <Messageboard/>
                </Route>
                <Route path="/login">
                    <Login
                        loggedIn={loggedIn}
                        toggleLoggedIn={toggleLoggedIn}
                    />
                </Route>
                <Route path="/registration">
                    <Registration/>
                </Route>
                <Route path="/profiles">
                    {loggedIn ? <Overview/> : <Redirect to="/login"/>}
                </Route>
                <Route path="/profile/:profileId">
                    <Profile/>
                </Route>
            </Switch>
        </>
    );
}

export default App;
