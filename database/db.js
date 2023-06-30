const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose.connect(
        process.env.KEYDATABASE,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(() => console.log("_MongoDB Atlas_\nServidor: CORELAB."))
        .catch((error) => console.error(error));
};

module.exports = connectToDb;