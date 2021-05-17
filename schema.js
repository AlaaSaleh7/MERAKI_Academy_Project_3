const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    age:{type:Number},
    country:{type:String},
    email: {type:String},
    password: {type:String}
});

const articlesSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    author:{type:mongoose.Schema.ObjectId,ref:"Users"},
});
const Users = mongoose.model("Users",usersSchema)
const Articles = mongoose.model("Articles",articlesSchema)

module.exports.Users = Users
module.exports.Articles = Articles

