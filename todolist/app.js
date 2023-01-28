
const express = require("express");
const date = require(__dirname + "/date.js")

const app = express();

app.set('view engine', "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))


var items = []
var workitems =[]
app.get("/", function(req,res){
    res.render("list", {listtitle : date.getDate(), newlistitems:items})
})

app.get('/work', function(req,res){
    res.render("list", {listtitle:"Work List", newlistitems:workitems})
})

app.post("/",function(req,res){
    console.log(req.body)
    if(req.body.list === "Work"){
        workitems.push(req.body.newItem)
        res.redirect("/work")
    }else{
        items.push(req.body.newItem)
        res.redirect("/")
    }

})



app.listen(3000, function(){
    console.log("server started")
})