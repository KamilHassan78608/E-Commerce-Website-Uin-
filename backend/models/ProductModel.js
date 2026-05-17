import mongoose from "mongoose";

const ProductSchema = new mongooose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    
})