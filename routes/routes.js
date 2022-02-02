const express = require('express');
const md5 = require('md5');
const router = express.Router();
const { Users, Posts } = require("../models/models");

//<---------------------------------- CRUD OPERATIONS FOR POSTS ------------------------------------------>

router.get("/", () => {
    console.log("Server Connected");
})

//<---------------------------- Get Posts from Database ---------------------------->

router.get("/postsdata", (req, res) => {
    
    Posts.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
        return null;
    })
})

//<------------- Get Specific Posts from Database --------------->

router.get("/postsdata/:_id", (req, res) => {
    
    const id = req.params._id;
    Posts.findById(id, (err, data) => {
        if (err) {
            res.status(500).send(err);
            throw new Error(err)
        } else {
            res.status(201).send(data);
        }
        return data;
    })
})

//<---------------------------- Post On the Posts Database ---------------------------->

router.post("/postsdata", (req, res) => {
    
    const db = req.body;
    Posts.create(db, err => {
        if (err) {
            throw new Error(err)
        } else {
            console.log("Posted on Server");
            return res.status(200).json({status: 'success'});
        }
    })
})

//<----------------------------------- Update Posts on the database --------------------------------->

router.put("/postsdata/update/:id", (req, res, next) => {

    const filter = { _id: req.params.id } //Filter Condition
    Posts.findByIdAndUpdate(filter,
        {
            $set: {
                title: req.body.title,
                postBody: req.body.postBody,
                author: req.body.author,
                imagesrc: req.body.imagesrc
            }
        },
        { new: true, useFindAndModify: true },
        err => {
            if (err) {
                throw new Error(err)
            } else {
                return res.status(200).json({ status: 'success' });
            }
        }
    )
})

//<---------------------------- Delete Posts from Database ---------------------------->

router.delete("/postsdata/:id", (req, res) => {

    Posts.findOneAndRemove({_id: req.params.id}, err => {
        if (err) {
            throw new Error(err)
        } else {
            return res.status(200).json({status: 'success'});
        }
    })
})

//<----------------------------------- CRUD OPERATIONS FOR USERS ------------------------------------------>

//<---------------------------- Register User on Database (SIGN UP) ------------------------------>

router.post("/users/register", async (req, res) => {
    const db = req.body;
    const { email } = db
    const userExist = await Users.findOne({ email }).exec()
    
    if (userExist) {
        res.status(422).json({ error: "User already exists" })
    } else {
        Users.create(db, err => {
            if (err) {
                console.log(err);
                throw new Error(err)
            } else {
                console.log("User Registered Successfully");
                return res.status(200).json({status: 'success'});
            }
        })
    }
})

//<--------------------- Authenticate User Credentials from Database (SIGN IN) ------------------>

router.post("/users/signin", async (req, res) => {
    const { email, password } = req.body
    const userExists = await Users.findOne({ email }).exec()
    
    if (!userExists) {
        res.status(422).json({ error: "User does not exist. Please register first" })
    } else {
        const passwordsMatch = await Users.find({ password: md5(password) }).select('password').limit(1)
        const hasAdminAccess = await Users.findOne({ password: md5(password) }).select('role')  
        if (passwordsMatch.length > 0) {
            // Check if user has Admin rights then return custom HTTP CODE
            if (hasAdminAccess.role === "admin") return res.status(209).json({ status: 'success' })
            else return res.status(200).json({ status: 'success' });
        } else {
            res.status(422).json({ error: "Passwords do not match" })
        }
    }
})

module.exports = router;