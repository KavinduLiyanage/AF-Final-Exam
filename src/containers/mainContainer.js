import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./users/register";
import Login from "./users/login";
import HomePage from "./homePage";
import Navbar from "../components/navbar";
// import ProductAdd from "./Products/productAdd";
// import ProductList from "./Products/productsList";
// import ProductEdit from "./Products/productEdit";
// import EditUser from "./Users/EditUser";
import PrivateRoute from "../auth/privateRoutes";

function MainContainer() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar />
                <div className="container" style={{ maxWidth: "80%", marginTop: 80, paddingLeft: 0, paddingRight: 0}}>
                    <Switch>
                        <Route exact path = '/login' component = { Login }/>
                        <Route exact path = '/register' component = { Register }/>
                        <Route exact path="/" component={HomePage} />

                        {/*All the Private Routes of System*/}
                        {/*<PrivateRoute component={EditUser} path="/users/:id" exact/>*/}
                        {/*<PrivateRoute component={ProductAdd} path="/addProduct" exact/>*/}
                        {/*<PrivateRoute component={ProductList} path="/products" exact/>*/}
                        {/*<PrivateRoute component={ProductEdit} path="/products/edit/:id" exact/>*/}
                    </Switch>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default MainContainer;