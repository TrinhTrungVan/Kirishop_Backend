import productRouter from "./productRouter.js";

const route = (app) => {
    app.use("/api/product", productRouter);
};

export default route;
