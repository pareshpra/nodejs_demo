import express from "express";
import { AddProduct, UpdateProduct, getAllProduct } from "./product.controller.js";


const router = express.Router();

router.get("/", );
router.post("/addProduct", AddProduct);
router.get("/getProductById");
router.put("/updateProduct/:id");
router.delete("/deleteProduct/:id",);

export default router;