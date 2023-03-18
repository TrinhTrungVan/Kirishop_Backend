import express from "express";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.delete("/:id", deleteCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.post("/create", createCategory);
categoryRouter.get("/", getCategories);

export default categoryRouter;
