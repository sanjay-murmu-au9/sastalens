const mongoose = require('mongoose')

const allCategorySchema = new mongoose.Schema({

    images: {
        scrolling_images: [
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
        ],
        Men_images: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                categoryName: {
                    type: String,
                    required: true
                }
            }
        ],

        Women_images: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                categoryName: {
                    type: String,
                    required: true
                }
            }
        ],

        Kids_images: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                categoryName: {
                    type: String,
                    required: true
                }
            }
        ],

        computer_Glasses: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                categoryName: {
                    type: String,
                    required: true
                }
            }
        ],

        sunglasses: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                categoryName: {
                    type: String,
                    required: true
                }
            }
        ],
        powerGlasses: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                categoryName: {
                    type: String,
                    required: true
                }
            }
        ],
        // category: {
        //     type: String,
        //     required: [true, 'Please select category for this product'],
        //     enum: {
        //         values: [
        //             'Men',
        //             'Women',
        //             'Kids',
        //             'Others',
        //             'Common Wear'
        //         ],
        //         message: 'Please select correct category for product'
        //     }
        // },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }

})

module.exports = mongoose.model('AllCategory', allCategorySchema);
