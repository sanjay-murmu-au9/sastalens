const fs = require('fs')
const mongoose = require('mongoose');
const colors = require('colors')
const dotenv = require('dotenv');


// Load env vars
dotenv.config({ path: './config/config.env' })

const Product = require('./models/product')


//Connect to DB
mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

});

//Read JSON files
const products = JSON.parse
    (fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8')
    );

//Import data into db
const importData = async () => {
    try {
        await Product.create(products)
        console.log('Data Imported...'.green.inverse);
        process.exit();

    } catch (error) {
        console.error(error);
    }
}

//Delete data
const deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data destroyed...'.red.inverse);
        process.exit();

    } catch (error) {
        console.error(error);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}




// const Product = require('../models/product');
// const dotenv = require('dotenv');
// const connectDatabase = require('../config/database');

// const products = require('../data/products');

// // Setting dotenv file
// dotenv.config({ path: 'backend/config/config.env' })

// connectDatabase();

// const seedProducts = async () => {
//     try {

//         await Product.deleteMany();
//         console.log('Products are deleted');

//         await Product.insertMany(products)
//         console.log('All Products are added.')

//         process.exit();

//     } catch (error) {
//         console.log(error.message);
//         process.exit();
//     }
// }

// seedProducts()