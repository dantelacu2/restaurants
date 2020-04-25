const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://dantelacu:emxtL1nxStNIv7x8@cluster0-6qufv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    }).then(s => {
        console.log("Successfully connected to MONGODB CLUSTER");
    });

const db = mongoose.connection

module.exports = db
