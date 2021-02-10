import React, {Component} from 'react';
import { TOKEN_FNAME, TOKEN_ID } from "../config/config";
import { isLogin, logout } from "../auth/auth";
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: isLogin()
        };
    }

    handleLogout = () => {
        logout();
        this.setState({
            isLogin: false,
        });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <a className="navbar-brand" href="/">
                                <b>Real Estate Agent</b>
                            </a>
                            <div
                                className="collapse navbar-collapse"
                                id="bs-example-navbar-collapse-1"
                            >
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a className="nav-link" href={`/allProperties`}>View all properties<span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a className="nav-link" href={`/addProperty`}>Add property <span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a className="nav-link" href={`/myDashboard/${localStorage.getItem(TOKEN_ID)}`}>My properties <span className="sr-only">(current)</span></a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ml-md-auto">
                                    <li className="nav-item active">
                                        {this.state.isLogin ? (
                                            <div className="loged-user-div">
                                                <b className="loged-user-name">
                                                    {" "}
                                                    Hi {localStorage.getItem(TOKEN_FNAME)}{" "}
                                                </b>
                                                <span className="badge badge-light">
                                                <Link to="" onClick={() => this.handleLogout()}>
                                                    Logout
                                                </Link>
                                                    </span>
                                            </div>
                                        ) : (
                                            <div className="nonLog-user-div">
                                            <span className="badge badge-light">
                                            <a href="/login">Login</a>
                                                </span>
                                            </div>
                                        )}
                                    </li>
                                    <br />
                                    <li className="nav-item dropdown"></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
