const mongoose = require('mongoose');

module.exports = (app, actions) => {
    let {
        DB_USERNAME,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_DATA,
    } = process.env;

    let mongoUri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATA}?authSource=admin`;
    mongoose
        .connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log('MongoDB Connected');
            app.db = mongoose.connection.db;
            actions(app);
        })
        .catch((err) => console.log('Database Error', err));
};
