// import Todo from "../models/todoModel.js";
// import TodoList from "../models/todoListModel.js";

import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
    const products = await Product.find({});
    console.log("Create Success!");
    res.json(products);
};

export const createProduct = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const newProduct = new Product(data);
        await newProduct.save();
        res.json({ message: "Create Success!" });
    } catch (e) {
        res.json({ error: "An error occurred!" });
    }
};

// export const deleteTodo = async (req, res) => {
//     const id = req.params.id;
//     const listId = req.query.listId;
//     await TodoList.findOneAndUpdate({ _id: listId }, { $pull: { data: id } });

//     const deleteItem = await Todo.findById(id);
//     await deleteItem.remove().then(() => res.send(JSON.stringify(deleteItem)));
// };

// export const updateTodo = async (req, res) => {
//     const id = req.params.id;
//     const updateItem = new Todo(req.body);
//     await Todo.findByIdAndUpdate(id, updateItem).then(() => res.send(JSON.stringify(updateItem)));
// };
