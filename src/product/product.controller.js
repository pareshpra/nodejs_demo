
import ProductModel from "./product.modal.js";


const getAllProduct = async (req, res) => {

    try {

    } catch (error) {

    }
};

const AddProduct = async (req, res) => {

    const { name, price, category } = req?.body;

    try {
        const productName = await ProductModel.findOne({ name: name });
        if (productName) {
            return res.status(400).json({
                success: false,
                message: "productName already used",
            });
        } else {
            const productDetails = new ProductModel({
                name, price, category
            });

            const productData = await productDetails.save();

            return res.status(200).json({
                message: "Product Added Successfully",
                data: productData,
            });

        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        })
    }
};

const UpdateProduct = async (req, res) => {
    try {

    } catch (error) {

    }
};


export { getAllProduct, AddProduct, UpdateProduct };