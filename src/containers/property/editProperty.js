import React, { Component } from "react";
import axios from "axios";
import { Typography, Button, Form, Input, DatePicker } from 'antd';
import { TOKEN_ID } from "../../config/config";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Category = [
    { key: 1, value: "Apartment" },
    { key: 2, value: "Building" },
    { key: 3, value: "House" },
    { key: 4, value: "Land" },
    { key: 5, value: "Office" }
]

const Type = [
    { key: 1, value: "For rent" },
    { key: 2, value: "For sell" }
]

class EditProperty extends Component {
    constructor(props) {
        super(props);

        // Setting up functions
        this.onChangePropertyName = this.onChangePropertyName.bind(this);
        this.onChangePropertyDes = this.onChangePropertyDes.bind(this);
        this.updateFiles = this.updateFiles.bind(this);
        this.onChangePropertyCategory = this.onChangePropertyCategory.bind(this);
        this.onChangePropertyType = this.onChangePropertyType.bind(this);
        this.onChangePropertyAddress = this.onChangePropertyAddress.bind(this);
        this.onChangePropertyPrice = this.onChangePropertyPrice.bind(this);
        this.onChangePropertyContactNumber = this.onChangePropertyContactNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            propertyName: "",
            propertyDescription: "",
            images: [],
            propertyCategory: "",
            propertyType: "",
            propertyAddress: "",
            propertyPrice: "",
            propertyContactNumber: ""
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/property/edit/' + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    propertyName: response.data.propertyName,
                    propertyDescription: response.data.propertyDescription,
                    images: response.data.images,
                    propertyCategory: response.data.propertyCategory,
                    propertyType: response.data.propertyType,
                    propertyAddress: response.data.propertyAddress,
                    propertyPrice: response.data.propertyPrice,
                    propertyContactNumber: response.data.propertyContactNumber,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangePropertyName(e) {
        this.setState({
            propertyName: e.target.value,
        });
    }

    onChangePropertyDes(e) {
        this.setState({
            propertyDescription: e.target.value,
        });
    }

    updateFiles(newImages) {
        this.setState({
            images: newImages,
        });
    }

    onChangePropertyCategory(e) {
        this.setState({
            propertyCategory: e.target.value,
        });
    }

    onChangePropertyType(e) {
        this.setState({
            propertyType: e.target.value,
        });
    }

    onChangePropertyAddress(e) {
        this.setState({
            propertyAddress: e.target.value,
        });
    }

    onChangePropertyPrice(e) {
        this.setState({
            propertyPrice: e.target.value,
        });
    }

    onChangePropertyContactNumber(e) {
        this.setState({
            propertyContactNumber: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.propertyName || !this.state.propertyDescription || !this.state.images
            || !this.state.propertyPrice || !this.state.propertyCategory || !this.state.propertyType
            || !this.state.propertyAddress || !this.state.propertyCategory) {
            return alert('Please fill all the fields')
        }

        const obj = {
            propertyName: this.state.propertyName,
            propertyDescription: this.state.propertyDescription,
            images: this.state.images,
            propertyCategory: this.state.propertyCategory,
            propertyType: this.state.propertyType,
            propertyAddress: this.state.propertyAddress,
            propertyPrice: this.state.propertyPrice,
            propertyContactNumber: this.state.propertyContactNumber,
        };

        axios
            .post('http://localhost:5000/property/update/' + this.props.match.params.id, obj)
            .then((res) => console.log(res.data));

        // Redirect to my properties
        window.location="/myDashboard/" +localStorage.getItem(TOKEN_ID);
    }

    render() {
        return (
            <div className="container" style={{ maxWidth: "700px", margin: "2rem auto"}}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <h2><b> Edit Property Details </b></h2>
                </div>
                <div >
                    <div>
                        <Form onSubmit={this.onSubmit}>
                            <label>Category</label>
                            <select
                                ref="propertyCategory"
                                required
                                className="form-control"
                                value={this.state.propertyCategory}
                                onChange={this.onChangePropertyCategory}
                            >
                                {Category.map(function (product) {
                                    return (
                                        <option key={product.key} value={product.value}>
                                            {product.value}
                                        </option>
                                    );
                                })}
                            </select>
                            <br/>
                            <label>Type</label>
                            <select
                                ref="propertyType"
                                required
                                className="form-control"
                                value={this.state.propertyType}
                                onChange={this.onChangePropertyType}
                            >
                                {Type.map(function (product) {
                                    return (
                                        <option key={product.key} value={product.value}>
                                            {product.value}
                                        </option>
                                    );
                                })}
                            </select>
                            <br/>
                            <label>Name</label>
                            <Input
                                required
                                onChange={this.onChangePropertyName}
                                value={this.state.propertyName}
                            />
                            <br/><br/>
                            <label>Description</label>
                            <TextArea
                                rows={4}
                                required
                                onChange={this.onChangePropertyDes}
                                value={this.state.propertyDescription}
                            />
                            <br/><br/>
                            <label>Address</label>
                            <Input
                                required
                                onChange={this.onChangePropertyAddress}
                                value={this.state.propertyAddress}
                            />
                            <br/><br/>
                            <label>Price</label>
                            <Input
                                required
                                onChange={this.onChangePropertyPrice}
                                value={this.state.propertyPrice}
                                type="number"
                            />
                            <br/><br/>
                            <label>Contact Number</label>
                            <Input
                                type="number"
                                required
                                onChange={this.onChangePropertyContactNumber}
                                value={this.state.propertyContactNumber}
                            />
                            <br/><br/>
                            <div>
                                <Button type="primary" block onClick={this.onSubmit}>
                                    Update Details
                                </Button>
                                <br/><br/>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProperty;
