const mongoose = require('mongoose')
const dburl = process.env.DBURL

//connecting database
mongoose.connect(
    dburl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log('Not connected to DB', err);
        } else {
            console.log('Successfully connected DB');
        }
    }
)