const db = require("../model/db")
const mongoose = db.mongoose
const uri = "mongodb+srv://netflix:013234656798@cluster0.04dsm.mongodb.net/?retryWrites=true&w=majority";
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