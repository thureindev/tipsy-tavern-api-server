const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_CONNECT_URI || 'mongodb://127.0.0.1:27017/drinks';

async function dbconnect() {
    await mongoose.connect(DB_URI)
}

dbconnect()
.then(() => {
    console.log('cocktail DB connected successfully')
})
.catch(err => console.log(err));

// -------------------------------------------
module.exports.mongoose = mongoose
// -------------------------------------------