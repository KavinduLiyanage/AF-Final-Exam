import React, {Component} from 'react';
import axios from "axios";
import PropertyRow from "../../components/propertyRow";
import { serverUrl, TOKEN_ID } from "../../config/config";

class ManageProperty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        axios
            .get(serverUrl + "/property/"+ localStorage.getItem(TOKEN_ID))
            .then((response) => {
                this.setState({
                    products: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    productList() {
        return this.state.products.map(function (object, i) {
            return <PropertyRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 30 , maxWidth: "70%"}}>
                <h2 align="center"><b>My properties list</b></h2>
                {this.state.products.length > 0 ? (
                    <table className="table table-striped table-hover" style={{ marginTop: 20 }}>
                        <thead>
                        <tr className="text-center">
                            <th>Name</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Address</th>
                            <th>Price</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        </thead>
                        <tbody className="text-center" >{this.productList()}</tbody>
                    </table>
                ) : (
                    <div style={{ textAlign: "center"}}>
                        <hr/>
                    <br/>
                        <div style={{display: "flex", height: "200px", justifyContent: "center", alignItems: "center",}}>
                            <h2>No Properties yet...</h2>
                        </div>
                        <span className="badge badge-light">
                            <a href="/addProperty"><button type="button" className="btn btn-dark">Add a property to sell or rent</button>
                            </a>
                        </span>
                    </div>
                )}

            </div>
        );
    }
}

export default ManageProperty;