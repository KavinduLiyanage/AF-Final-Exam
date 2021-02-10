import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import SearchFeature from "../../components/searchFeature";
import ImageSlider from "../../components/imageSlider";

const { Meta } = Card;
const { Text } = Typography;

function AllProperties() {

    const [properties, setProperties] = useState([]);
    const [SearchTerms, setSearchTerms] = useState("");

    useEffect(() => {
        const variables = {};

        getProperties(variables);
    }, []);

    //Fetching all properties details
    const getProperties = (variables) => {
        Axios.post('http://localhost:5000/property/getProperties', variables).then(
            (response) => {
                if (response.data.success) {
                    setProperties(response.data.properties);

                } else {
                    alert("Failed to fetch property data");
                }
            }
        );
    };

    const updateSearchTerms = (newSearchTerm) => {
        const variables = {
            searchTerm: newSearchTerm,
        };

        setSearchTerms(newSearchTerm);
        getProperties(variables);
    };

    const renderCards = properties.map((property, index) => {
        return (
            <Col key={property._id} lg={8} md={20} xs={24}>
                <Card hoverable={true}
                      cover={
                          <Link to={"/property/" + property._id}>
                              <ImageSlider images={property.images} />
                          </Link>
                      }
                >
                    <Meta title={property.propertyName}/>
                    <div className="additional">
                        <Text type="warning">Category : {property.propertyCategory}</Text>
                        <br />
                        <b><Text type="secondary">Rs. {property.propertyPrice}.00</Text></b>
                    </div>
                </Card>
            </Col>
        );
    }).reverse();

    return (
        <div style={{ width: "75%", margin: "1rem auto" }}>
            <div style={{ textAlign: "center"}}>
                <h2><b> Explore All Properties</b></h2>
            </div>
            {/* Search */}
            <div style={{display: "flex", justifyContent: "flex-end", margin: "1rem auto",}}>
                <SearchFeature refreshFunction={updateSearchTerms} />
            </div>

            {/* Properties card view  */}
            {properties.length === 0 ? (
                <div style={{display: "flex", height: "300px", justifyContent: "center", alignItems: "center",}}>
                    <h2>No Properties yet...</h2>
                </div>
            ) : (
                <div>
                    <Row gutter={[16, 16]}>{renderCards}</Row>
                </div>
            )}
            <br />
            <br />
        </div>
    );
}

export default AllProperties;
