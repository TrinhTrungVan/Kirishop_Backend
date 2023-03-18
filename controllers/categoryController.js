import auth from "../middleware/auth.js";
import Category from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (!result.isAdmin) return res.status(400).json({ error: "Authentication is not valid." });

        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Name can not be left blank." });

        const newCategory = new Category({ name });

        await newCategory.save();
        res.json(newCategory);
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (!result.isAdmin) return res.status(400).json({ error: "Authentication is not valid." });

        const { id } = req.params;
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Name can not be left blank." });

        await Category.findByIdAndUpdate({ _id: id }, { name: name });
        const updatedCategory = await Category.findById(id);
        res.json(updatedCategory);
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (!result.isAdmin) return res.status(400).json({ error: "Authentication is not valid." });

        const { id } = req.params;

        await Category.findByIdAndDelete(id);
        res.json({ id });
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};
