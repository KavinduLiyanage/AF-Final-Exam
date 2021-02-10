import React from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../auth/auth";
import { serverUrl } from "../../config/config";

toast.configure();

//Login page of the System
export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
        };
    }

    updateInput(key, value) {
        this.setState({
            [key]: value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const users = {
            email: this.state.email,
            password: this.state.password,
        };

        axios
            .post(serverUrl + "/users/", users)
            .then((response) => {
                toast("Login Successful");

                login(response.data.token, response.data.user);
                window.location = "/";

            })
            .catch((error) => {
                console.log(error.response);
                toast("Please Check Email or Password");
                this.setState({
                    password: "",
                });
            });
    }

    render() {
        return (
            <div className="container" style={{ maxWidth: "40%"}}>
                <div className=" h-100">
                    <h3 align="center">Login</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" placeholder="Email"
                                   value={this.state.email}
                                   onChange={(e) => this.updateInput("email", e.target.value)}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control"  placeholder="password"
                                   value={this.state.password}
                                   onChange={(e) =>
                                       this.updateInput("password", e.target.value)
                                   }
                                   required/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </form>
                    <br/>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Don't have an account?<a href="/register">Register</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}