require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10

const app = express();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost:27017/userDB")

const UserSchema = new mongoose.Schema({
    email : String,
    password : String
})
const User = new mongoose.model("User", UserSchema)


app.get("/",function(req,res){
    res.render("home")
})

app.get("/login",function(req,res){
    res.render("login")
})

app.get("/register",function(req,res){
    res.render("register")
})


app.post("/register",function(req,res){

    User.findOne({email : req.body.username},function(err, foundUser){
        if(err){
            res.send(err)
        }else if (foundUser){
            res.send("email already been used")
        }else{
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                const newUser = new User({
                    email : req.body.username,
                    password : hash
                })
                newUser.save()
                res.render("secrets")
            });

        }
    })

})
app.post("/login",function(req,res){
    const username = req.body.username
    const password = req.body.password

    User.findOne({email : username},function(err,foundUser){
        if (err){
            res.send(err)
        }
        else if(foundUser){

            bcrypt.compare(password, foundUser.password, function(err, result) {
                if(result){
                    res.render("secrets")
                }else{
                    res.send("email/password is wrong")
                }
            });
        }else{
            res.send("email/password is wrong")
        }
    });
})

app.listen(3000, function(){
    console.log("server started")
})