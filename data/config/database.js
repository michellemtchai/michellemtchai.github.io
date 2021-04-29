const mongoose = require('mongoose');

module.exports = (app, actions) => {
    let {
        DB_TYPE,
        DB_USERNAME,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_DATA,
    } = process.env;

    let mainUri =
        DB_PORT !== ''
            ? `${DB_HOST}:${DB_PORT}/${DB_DATA}`
            : `${DB_HOST}/${DB_DATA}`;
    let mongoUri = `${DB_TYPE}://${DB_USERNAME}:${DB_PASSWORD}@${mainUri}?authSource=admin&retryWrites=true&w=majority`;
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
