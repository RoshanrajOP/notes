const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const notesRoutes = require('./routes/notes')

const app = express()
const PORT = process.env.PORT || 5000;

connectDB();
app.use(bodyParser.json())
app.use(express.static('public'));

app.use('/notes', notesRoutes);
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})