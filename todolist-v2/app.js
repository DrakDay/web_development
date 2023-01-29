//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require('lodash');
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', false)

mongoose.connect("mongodb+srv://admin:admin@cluster0.2f7ze1k.mongodb.net/todolistDB?retryWrites=true&w=majority")

const ItemSchema = new mongoose.Schema({
  name:{
    type: String,
    required: false
  }
});

const ListSchema = new mongoose.Schema({
  name:String,
  item : [ItemSchema]
})

const Item = new mongoose.model("Item", ItemSchema);
const List = new mongoose.model("List", ListSchema);

app.get("/", function(req, res) {

  const day = date.getDate();

  Item.find({},function(err, foundItems){
    res.render("list", {listTitle: day, newListItems: foundItems});
  })

});

app.get("/:customlistname", function(req,res){

  const customlistname = _.capitalize( req.params.customlistname);

  List.findOne({name:customlistname},function(err, foundlist){
    if (!err){
      if(foundlist){
        res.render("list", {listTitle: foundlist.name , newListItems: foundlist.item});
      }else{
        const list = new List({
          name : customlistname,
          item : undefined
        })
        list.save()
        res.redirect("/" + customlistname)
      }
    }
  })
  
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const ListName = req.body.list;
  const item = new Item({
    name : itemName
  })

  

  if (ListName === date.getDate()) {
    item.save();
    res.redirect("/");

  } else {
    List.findOne({name: ListName}, function(err, foundlist){
      foundlist.item.push(item);
      foundlist.save();
      res.redirect("/" + ListName)
    })
  }
});

app.post("/delete",function(req,res){
  const checkboxid = req.body.checkbox;
  const listname = req.body.listName;


  if (listname === date.getDate()){
    Item.deleteOne( {_id :checkboxid }, function(err){
      if(!err){
        res.redirect("/")
      }
    }
  )}else{
    List.findOneAndUpdate({name :listname }, {$pull : {item : {_id : checkboxid}}},
      function(err){
        if(!err)
        res.redirect("/" + listname)
      }  
    )}

})


app.listen( process.env.PORT ||3000, function() {
  console.log("Server started on port 3000");
});
