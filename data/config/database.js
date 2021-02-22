const mongoose = require('mongoose');

module.exports = (actions) =>{
    let {
        DB_USERNAME,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_DATA,
    } = process.env;

    let mongoUri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATA}?authSource=admin`;
    mongoose.connect(
        mongoUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() =>{
        console.log('MongoDB Connected');
        actions();
    })
    .catch(err => console.log('Database Error', err));
};