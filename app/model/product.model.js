
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProductSchema = new schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee_model',
        required: true
    },
    createdByName: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product_model', ProductSchema);