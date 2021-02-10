import React from 'react';
// import ProductsList from "./Products/productsList";
import { TOKEN_FNAME, TOKEN_LNAME } from "../../config/config";
import PropertiesCardView from "./propertiesCardView";
import logo from './background1920.jpg';

export default class Homepage extends React.Component  {
    render() {
        return (
            <div style={{ marginTop: -45}}>
                <img
                    className="d-block w-100"
                    alt="Carousel Bootstrap Third"
                    src={logo}
                />
                <h2 className="image-onText"><span>Let’s find a place that’s perfect for you.</span></h2>
                <h2 className="image-onText2"><span>Search confidently with your trusted source of properties for sale or rent.</span></h2>
            <div className="container">

                {/*<h1 align="center"> <span className="badge badge-dark">*/}
                {/*    Welcome {localStorage.getItem(TOKEN_FNAME)} {localStorage.getItem(TOKEN_LNAME)}*/}
                {/*</span></h1>*/}

                <PropertiesCardView/>
            </div>
            </div>
        );
    }
}