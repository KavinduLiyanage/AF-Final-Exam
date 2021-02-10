import React, {Component} from 'react';
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import {Typography} from "antd";

const { Title, Text } = Typography;

class DetailsProperty extends Component {

    constructor(props) {
        super(props);

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
        axios.get('http://localhost:5000/property/edit/' + this.props.match.params.id)
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

    render() {
        return (
            <div className="container" style={{
                maxWidth: "600px",
                margin: "2rem auto",
            }}>
                <div style={{textAlign: "center"}}>
                    <Title level={2}>
                        <Text strong> {this.state.propertyName} </Text>
                    </Title>
                </div>
                <ImageSlider images={this.state.images}/>
                <br/>
                <h5><span className="badge badge-secondary">Type : {this.state.propertyType}</span></h5>
                <h5><span className="badge badge-secondary">Category : {this.state.propertyCategory}</span></h5>
                <h4><span className="badge badge-secondary">Price : Rs.{this.state.propertyPrice}.00</span></h4>
                <h5><span className="badge badge-secondary">Description</span></h5>
                <Text type="secondary">{this.state.propertyDescription}</Text>
                <h5><span className="badge badge-secondary">Address : {this.state.propertyAddress}</span></h5>
                <h5><span className="badge badge-secondary">Contact Number : {this.state.propertyContactNumber}</span></h5>
            </div>
        );
    }
}

export default DetailsProperty;