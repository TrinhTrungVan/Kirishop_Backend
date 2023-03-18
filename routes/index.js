import authRouter from "./authRouter.js";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";

const route = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);
    app.use("/api/product", productRouter);
    app.use("/api/category", categoryRouter);
};

export default route;
