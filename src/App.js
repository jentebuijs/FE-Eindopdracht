import './App.css';
import {Route, Switch} from "react-router-dom";
import Home from "./pages/home/home";
import Messageboard from "./pages/messageboard/messageboard";
import Overview from "./pages/overview/overview";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";

function App() {

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/messageboard">
                    <Messageboard/>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/registration">
                    <Registration/>
                </Route>
                <Route path="/profiles">
                    <Overview/>
                </Route>
                <Route path="/profile/:profileId">
                    <Profile/>
                </Route>
            </Switch>
        </>
    );
}

export default App;
