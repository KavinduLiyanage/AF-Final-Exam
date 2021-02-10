import React, {Component} from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../../config/config";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class Register extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            password: "",
            conPassword: "",
            address: "",
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNo: this.state.phoneNo,
            password: this.state.password,
            address: this.state.address,
        };

        if (this.state.password === this.state.conPassword) {

            axios
                .post(serverUrl + "/users/add", users)
                .then((response) => {

                    toast("Register Successful , You will be redirected to Login Page");
                    setTimeout(() => {
                        window.location = "/login";
                    }, 5000);
                })
                .catch((error) => {
                    console.log(error.response);
                    toast("Email or Username Exists");
                    this.setState({
                        username: "",
                        email: "",
                        password: "",
                        conPassword: "",
                    });
                });
        } else {
            toast("Password doesn't match");
            this.setState({
                password: "",
                conPassword: "",
            });
        }
    }

    render() {
        return (
            <div className="container" style={{ maxWidth: "40%"}}>
                <h2 align="center"><b>Create an account</b></h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text"
                               className="form-control"
                               placeholder="First Name"
                               value={this.state.firstName}
                               onChange={(e) =>
                                   this.updateInput("firstName", e.target.value)
                               }
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Last Name"
                               value={this.state.lastName}
                               onChange={(e) =>
                                   this.updateInput("lastName", e.target.value)
                               }
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email"
                               className="form-control"
                               placeholder="Email"
                               value={this.state.email}
                               onChange={(e) => this.updateInput("email", e.target.value)}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Phone No</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Phone No"
                               value={this.state.phoneNo}
                               onChange={(e) =>
                                   this.updateInput("phoneNo", e.target.value)
                               }
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                               className="form-control"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={(e) =>
                                   this.updateInput("password", e.target.value)
                               }
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password"
                               className="form-control"
                               placeholder="Confirm Password"
                               value={this.state.conPassword}
                               onChange={(e) =>
                                   this.updateInput("conPassword", e.target.value)
                               }
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            placeholder="Address"
                            rows="1"
                            className="form-control"
                            value={this.state.address}
                            onChange={(e) =>
                                this.updateInput("address", e.target.value)
                            }
                            required/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                    <br/><br/>
                </form>
            </div>
        );
    }
}

export default Register;