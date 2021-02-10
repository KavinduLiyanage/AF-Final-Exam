import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./users/register";
import Login from "./users/login";
import HomePage from "./home/homePage";
import Navbar from "../components/navbar";
import PrivateRoute from "../auth/privateRoutes";
import AddProperty from "./property/addProperty";
import AllProperties from "./property/allProperties";
import DetailsProperty from "./property/detailsProperty";
import ManageProperty from "./property/manageProperty";
import EditProperty from "./property/editProperty";

function MainContainer() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar />
                <div className="container" style={{ maxWidth: "100%", marginTop: 80, paddingLeft: 0, paddingRight: 0}}>
                    <Switch>
                        {/*All the Public Routes of System*/}
                        <Route component={HomePage} exact path="/" />
                        <Route component = { Login } exact path = '/login' />
                        <Route component = { Register } exact path = '/register' />
                        <Route component={ AllProperties } exact path="/allProperties"  />
                        <Route component={ DetailsProperty } exact path="/property/:id"  />

                        {/*All the Private Routes of System*/}
                        <PrivateRoute component={ AddProperty } exact path="/addProperty" />
                        <PrivateRoute component={ EditProperty } exact path="/edit/:id" />
                        <PrivateRoute component={ ManageProperty } exact path="/myDashboard/:id" />
                    </Switch>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default MainContainer;