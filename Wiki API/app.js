const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://admin:admin@cluster0.2f7ze1k.mongodb.net/WikiDB?retryWrites=true&w=majority")


const ArticleSchema = new mongoose.Schema({
    title : String,
    content : String
});

const Article = new mongoose.model("Article", ArticleSchema);


app.get("/", function(req,res){

})

///////////////////// all article ////////////////////////////////////////
app.route("/articles")
    .get(function(req,res){

        Article.find({}, function(err, foundArticles){
            if(!err){
                res.send(foundArticles)
            }else{
                res.send(err)
            }
        })
    })

    .post(function(req,res){

        const articleName = req.body.title;
        const articleContent = req.body.content;
        
        const article = new Article({
            title : articleName,
            content : articleContent
        })
    
        article.save(function(err){
            if(err){
                res.send(err)
            }else{
                res.send( "new article add")
            }
        });
    })

    .delete(function(req,res){

        Article.deleteMany({},function(err){
            if(err){
                res.send(err)
            }else{
                res.send("articles deleted")
            }
        })
    });


///////////////////////////// specific  article ////////////////////////////////////////

app.route("/articles/:articleTitle")
    .get(function(req,res){

        Article.findOne({title : req.params.articleTitle}, function(err, foundArticles){
            if(!foundArticles){
                res.send("cant find article")
            }else{
                res.send(foundArticles)
            }
        })

    })

    .put(function(req,res){

        Article.replaceOne({title:req.params.articleTitle}, 
            {title : req.body.title, content : req.body.content},
            function(err){
                if (!err){
                    res.send(req.params.articleTitle + ' put done')
                    
                }else{
                    res.send("can not find article : " + req.params.articleTitle)
                }
            });
    })

    .patch(function(req,res){
        Article.updateOne({title:req.params.articleTitle}, 
            {$set: req.body},
            function(err){
                if (!err){
                    res.send(req.params.articleTitle + ' patch done')
                }else{
                    res.send("can not find article : " + req.params.articleTitle)
                }
            });
    })

    .delete(function(req,res){

        const articlename = req.params.articleTitle;

        Article.deleteOne({title : articlename}, function(err){
            if(err){
                res.send(err)
            }else{
                res.send(articlename + " deleted ")
            }
        })

    })


app.listen(3000, function(){
    console.log("server started")
})