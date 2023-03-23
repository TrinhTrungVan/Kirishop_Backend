import express from "express";
import {
    getProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.delete("/:id", deleteProduct);
productRouter.patch("/:id", updateProduct);
productRouter.post("/create", createProduct);
productRouter.get("/:id", getProductDetails);
productRouter.get("/", getProducts);

export default productRouter;
