import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div className="top1" key={index}>
                        <img
                            // style={{ width: "100%", maxHeight: "50%" }}
                            src={`http://localhost:5000/${image}`}
                            alt="Property Image"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default ImageSlider;
