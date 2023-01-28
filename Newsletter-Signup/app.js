const express = require("express")
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))

mailchimp.setConfig({
    apiKey: "f2de4066eb0d7a5ceb2c8c4a3226e460-us21",
    server: "us21",
  });

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
 
    const listId = "1da6d60dcb";
    const subscribingUser = {
        firstName: req.body.FName,
        lastName: req.body.LName,
        email: req.body.Email
    };
   
    console.log(subscribingUser)
    async function run() {
        try{
            const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
            });
    
            console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id}.`
            );
            res.sendFile(__dirname + "/success.html");
        } catch (e) {
            console.log("failed")
            res.sendFile(__dirname + "/failure.html");
        }
    }
    run();
  })

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen( process.env.PORT ||3000, function(){
    console.log("apiwjdiwd");
})