
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;