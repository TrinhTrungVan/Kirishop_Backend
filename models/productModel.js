import mongoose, { Schema } from "mongoose";
// import Category from './categoryModel'

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            require: true,
        },
        category: {
            type: String,
            // ref: Category,
            require: true,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        inStock: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
let Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
