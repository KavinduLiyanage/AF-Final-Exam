import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TOKEN_ID } from "../config/config";

class PropertyRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        axios
            .get('http://localhost:5000/property/delete/' + this.props.obj._id)
            .then(console.log("Deleted"))
            .catch((err) => console.log(err));

        window.location="/myDashboard/" +localStorage.getItem(TOKEN_ID);
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.propertyName}</td>
                <td>{this.props.obj.propertyCategory}</td>
                <td>{this.props.obj.propertyType}</td>
                <td>{this.props.obj.propertyAddress}</td>
                <td>Rs.{this.props.obj.propertyPrice}.00</td>
                <td>
                    <Link to={"/edit/" + this.props.obj._id}
                          className="btn btn-outline-dark btn-sm"
                    >
                        Edit
                    </Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-outline-danger btn-sm">
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default PropertyRow;
