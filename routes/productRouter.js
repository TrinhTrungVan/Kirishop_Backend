import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";

const postRouter = express.Router();

// postRouter.delete("/:id", deleteTodo);
// postRouter.put("/:id", updateTodo);
postRouter.post("/create", createProduct);
postRouter.get("/", getProducts);

export default postRouter;
