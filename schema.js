const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const usersSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    age:{type:Number},
    country:{type:String},
    email: {type:String},
    password: {type:String},
    role:{type:mongoose.Schema.ObjectId,ref:"roles"}
});

//before saving the user information make this 
usersSchema.pre("save",async function(){
this.email = this.email.toLowerCase()
console.log(this.email)
const salt = 10;
const hashedPassword =await bcrypt.hash(this.password,salt)

this.password = hashedPassword
//console.log(hashedPassword)
});

const articlesSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}]
});

const commentSchema = new mongoose.Schema({
    comment :{type:String},
    commenter :{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
})
const rolesSchema=new mongoose.Schema({
    role:{type:String},
    permissions:[{type:String}]
  })
const Users = mongoose.model("Users",usersSchema)
const Articles = mongoose.model("Articles",articlesSchema)
const Comment = mongoose.model("Comment",commentSchema)
const roles = mongoose.model("roles", rolesSchema);
module.exports.role = roles;
module.exports.Users = Users
module.exports.Articles = Articles
module.exports.Comment = Comment

