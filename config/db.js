const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log("mongodb connected")
    } catch (err) {
        console.error("error mongo", err.message)
        process.exit(1);
    }
}

module.exports = connectDB;