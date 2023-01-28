const mongoose = require("mongoose")
mongoose.set('strictQuery', false)

mongoose.connect("mongodb://localhost:27017/fruitsDB")

const fruitsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
})

const Fruit = mongoose.model("Fruit", fruitsSchema)

const fruit = new Fruit({
    name:"Apple",
    rating:7,
    review:"nice"
})

const personSchema = new mongoose.Schema({
    name: String,
    age : Number,
    favouriteFruit : fruitsSchema
})

const Person = mongoose.model("Person", personSchema)

const person = new Person({
    name:"li",
    age:26,
    favouriteFruit : fruit
})
//fruit.save()
//person.save()

Fruit.find(function(err, fruits){
    if(err){
        console.log(err)
    }else{
        mongoose.connection.close();

        fruits.forEach(f => console.log(f.name))
    }
})

Person.updateOne({name:"zhi"}, {favouriteFruit:fruit}, function(err){
    if (err){
        console.log(err)
    }else{
        console.log("yeah")
    }
})


