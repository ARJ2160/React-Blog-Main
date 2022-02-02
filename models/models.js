const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// <----------------------- Creating Two Schemas ---------------------------------->

const usersSchema = mongoose.Schema({
    _id: String,
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    role: String,
})

const postsSchema = new Schema({
    _id: String,
    title: String,
    author: String,
    postBody: String,
    imagesrc: String
})

//<----------------------- Creating Two Models ---------------------------------->
const Users = mongoose.model("Users", usersSchema);
const Posts = mongoose.model("Post", postsSchema);

//<----------------------- Export Models ---------------------------------->
module.exports = {
    Users, Posts
}