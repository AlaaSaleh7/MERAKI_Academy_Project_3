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
    author:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
    comments:{type:Array}
});

const commentSchema = new mongoose.Schema({
    comment :{type:String},
    commenter :{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
})
const Users = mongoose.model("Users",usersSchema)
const Articles = mongoose.model("Articles",articlesSchema)
const Comment = mongoose.model("Comment",commentSchema)

module.exports.Users = Users
module.exports.Articles = Articles
module.exports.Comment = Comment

