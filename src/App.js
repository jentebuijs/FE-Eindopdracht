import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
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

function PrivateRoute({children, isAuth, ...rest}) {
    return (
        <Route {...rest}>
            {isAuth ? children : <Redirect to="/inloggen"/>}
        </Route>
    )
}

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
                <PrivateRoute isAuth={isAuth} path="/profielen">
                    <Overview/>
                </PrivateRoute>
                <PrivateRoute isAuth={isAuth} path="/profiel/:username">
                    <Profile/>
                </PrivateRoute>
            </Switch>
            <Footer />
        </>
    );
}

export default App;
