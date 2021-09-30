const mongoose = require('mongoose')

const scrollingImgSchema = new mongoose.Schema({
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ]

})

module.exports = mongoose.model('ScrollingImg', scrollingImgSchema)