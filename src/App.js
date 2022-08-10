import './App.css';
import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home/Home";
import Messageboard from "./pages/Messageboard/Messageboard";
import Overview from "./pages/Overview/Overview";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ProfileChange from "./pages/ProfileChange/ProfileChange";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/prikbord">
                    <Messageboard/>
                </Route>
                <Route path="/inloggen">
                    <SignIn/>
                </Route>
                <Route path="/registreren">
                    <SignUp/>
                </Route>
                <Route path="/profielen">
                    <Overview/>
                </Route>
                <Route path="/profiel/:username">
                    <Profile/>
                </Route>
                <Route path="/profiel/:username/bewerken">
                    <ProfileChange/>
                </Route>
            </Switch>
            <Footer />
        </>
    );
}

export default App;
