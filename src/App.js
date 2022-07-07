import './App.css';
import {Route, Switch} from "react-router-dom";
import Home from "./pages/home/home";
import Messageboard from "./pages/messageboard/messageboard";
import Overview from "./pages/overview/overview";
import Profile from "./pages/profile/profile";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";

function App() {

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/prikbord">
                    <Messageboard/>
                </Route>
                <Route path="/inloggen">
                    <SignIn />
                </Route>
                <Route path="/registreren">
                    <SignUp/>
                </Route>
                <Route path="/profielen">
                    <Overview/>
                </Route>
                <Route path="/profiel/:profileId">
                    <Profile/>
                </Route>
            </Switch>
        </>
    );
}

export default App;
