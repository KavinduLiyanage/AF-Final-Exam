const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Property Model
const propertySchema = new Schema(
    {
        propertyName: { type: String, required: true, trim: true },
        propertyDescription: { type: String, required: true, trim: true },
        images: {type: Array, default: [] },
        propertyCategory: { type: String, required: true, trim: true },
        propertyType: { type: String, required: true, trim: true },
        propertyAddress: { type: String, required: true, trim: true },
        propertyPrice: { type: Number, required: true, trim: true },
        propertyContactNumber: { type: Number, required: true, trim: true },
        userId: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

const Property = mongoose.model("Property", propertySchema);

//Export Property
module.exports = Property;