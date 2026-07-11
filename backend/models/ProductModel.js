import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true,
        enum : ['Men', 'Women', 'Kids', 'Unisex']
    },
    subCategory : {
        type : String,
        required : true,
    },
    themes : {
        type : [String],
        default : []
    },
    sizes : {
        type : [String],
        default : []
    },
    bestseller : {
        type : Boolean,
        default : false
    }
}, {
    timestamps : true
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;