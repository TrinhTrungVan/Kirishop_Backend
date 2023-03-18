import auth from "../middleware/auth.js";
import Product from "../models/productModel.js";
class APIFeatures {
    query;
    queryString;

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const { category, search } = this.queryString;
        if (category && category !== "all") {
            this.query = this.query.find({ category: this.queryString.category });
        }
        if (search && search !== "all") {
            this.query = this.query.find({
                title: { $regex: this.queryString.search, $options: "i" },
            });
        }

        return this;
    }

    sorting() {
        const { sort } = this.queryString;
        if (sort === "newest" || sort === "") this.query = this.query.sort("-createdAt");
        if (sort === "oldest") this.query = this.query.sort("createdAt");
        if (sort === "high-low") this.query = this.query.sort("-price");
        if (sort === "low-high") this.query = this.query.sort("price");

        return this;
    }
}

export const getProducts = async (req, res) => {
    console.log(req.query);
    try {
        const features = new APIFeatures(Product.find(), req.query).filtering().sorting();

        const result = await features.query;

        res.status(200).json({
            result: result.length,
            products: result,
        });
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (!result.isAdmin) return res.status(400).json({ error: "Authentication is not valid." });

        const { title, description, category, images, price, inStock } = req.body;
        if (!title || !description || !category)
            return res.status(400).json({ error: "Please complete all fields!" });
        const newProduct = new Product({ title, description, category, images, price, inStock });
        await newProduct.save();
        res.status(200).json(newProduct);
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (!result.isAdmin) return res.status(400).json({ error: "Authentication is not valid." });

        const { id } = req.params;
        const data = req.body;
        await Product.findByIdAndUpdate(id, data);

        res.status(200).json({ message: "Update Success!" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (!result.isAdmin) return res.status(400).json({ error: "Authentication is not valid." });

        const { id } = req.params;
        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Delete Success!" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};
