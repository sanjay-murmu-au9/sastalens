const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
	useCreateIndex:true

    }).then(conn => {
        console.log(`MongoDB Database connected with HOST: ${conn.connection.host}`)
    })
}

module.exports = connectDatabase;