const express = require("express");
const propertyRoutes = express.Router();
const multer = require("multer");

// Property Model
let Property = require("../models/propertyModel");

//@route GET
// Defined get all properties data route
propertyRoutes.route('/').get(function (req,res) {
    Property.find(function (err, game) {
        if(err)
            console.log(err);
        else
            res.json(game);
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
        .then(game => {
            res.status(200).json({'game': 'game is added successfully'})
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//@route POST
// Defined get all properties data route
propertyRoutes.route('/getgames').post(function (req,res) {
    let term = req.body.searchTerm;
    if(term) {
        Property.find({ gameName: { $regex: term, $options: "i" } })
            .exec((err, games) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true, games });
            });
    }
    else {
        Property.find()
            .exec((err, games) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true, games });
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
    Property.findById(req.params.id, function (err, game) {
        if (!game)
            res.status(404).send("game is not found");
        else {
            game.gameName = req.body.gameName;
            game.gameDes = req.body.gameDes;
            game.gamePrice = req.body.gamePrice;
            game.gameCategory = req.body.gameCategory;
            game.gameReleaseDate = req.body.gameReleaseDate;

            game.save().then(game => {
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
    Property.findOneAndDelete({_id: req.params.id}, function (err, game) {
        if (err)res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = propertyRoutes;