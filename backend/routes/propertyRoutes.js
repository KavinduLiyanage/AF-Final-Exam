const express = require("express");
const propertyRoutes = express.Router();
const multer = require("multer");

// Property Model
let Property = require("../models/propertyModel");

//@route GET
// Defined get all properties data route
propertyRoutes.route('/').get(function (req,res) {
    Property.find(function (err, property) {
        if(err)
            console.log(err);
        else
            res.json(property);
    });
});

// Defined image routes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".jpg" || ext !== ".png") {
            return cb(res.status(400).end("only jpg, png are allowed"), false);
        }
        cb(null, true);
    },
});

const upload = multer({storage: storage}).single("file");

//@route POST
// Defined upload image route
propertyRoutes.post("/uploadImage", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({
            success: true,
            image: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
});

//@route POST
// Defined add new property route
propertyRoutes.route('/add').post(function (req,res) {
    let property = new Property(req.body);
    property.save()
        .then(property => {
            res.status(200).json({'property': 'Property is added successfully'})
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//@route POST
// Defined get all properties data route
propertyRoutes.route('/getProperties').post(function (req,res) {
    let term = req.body.searchTerm;
    if(term) {
        Property.find({ propertyName: { $regex: term, $options: "i" } })
            .exec((err, properties) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true, properties });
            });
    }
    else {
        Property.find()
            .exec((err, properties) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true, properties });
            });
    }
});

//@route GET
// Defined get specific property details using id
propertyRoutes.route('/edit/:id').get(function (req,res) {
    let id = req.params.id;
    Property.findById(id, function (err, property) {
        res.json(property);
    });
});

//@route POST
// Defined update property details using id
propertyRoutes.route('/update/:id').post(function (req, res) {
    Property.findById(req.params.id, function (err, property) {
        if (!property)
            res.status(404).send("property is not found");
        else {
            property.propertyName = req.body.propertyName;
            property.propertyDescription = req.body.propertyDescription;
            property.propertyCategory = req.body.propertyCategory;
            property.propertyType = req.body.propertyType;
            property.propertyAddress = req.body.propertyAddress;
            property.propertyPrice = req.body.propertyPrice;
            property.propertyContactNumber = req.body.propertyContactNumber;

            property.save().then(property => {
                res.json('Update Complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update database");
                });
        }
    });
});

//@route GET
// Defined delete property using id
propertyRoutes.route('/delete/:id').get(function (req,res) {
    Property.findOneAndDelete({_id: req.params.id}, function (err, property) {
        if (err)res.json(err);
        else res.json('Successfully removed');
    });
});

//@route GET
//@desc Get all products data
propertyRoutes.route("/:id").get((req, res) => {
    const userId = req.params.id;
    Property.find({ userId: { $regex: userId, $options: "i" } })
        .then((properties) => res.json(properties))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = propertyRoutes;