const db = require("../model/db")
const mongoose = db.mongoose
const uri = "mongodb+srv://chau:123@cluster0.na875mm.mongodb.net/?retryWrites=true&w=majority";
const connectDB = () => {
    mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Successfully connect to MongoDB.");
        })
        .catch(err => {
            console.error("Connection error", err);
        });
}

module.exports = {
    connectDB
}