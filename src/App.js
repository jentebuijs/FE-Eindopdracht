import './App.css';
import {NotificationContainer} from 'react-notifications';
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./pages/Home/Home";
import Messageboard from "./pages/Messageboard/Messageboard";
import Overview from "./pages/Overview/Overview";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AdminSection from "./pages/AdminPage/AdminSection";

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
            <main>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/prikbord">
                        <Messageboard/>
                    </Route>
                    <PrivateRoute isAuth={isAuth} path="/prikbord/admin">
                        <AdminSection/>
                    </PrivateRoute>
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
            </main>
            <Footer/>
            <NotificationContainer />
        </>
    );
}

export default App;
