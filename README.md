### NODE STARTER PACKAGE

Github repository at https://github.com/apurva2307/node-starter

#### Sapmle code

- const {connectDB, app, notFoundMiddleware, errorHandlerMiddlewar, setRateLimiter} = require("@apurva2307/node-starter");

- setRateLimiter(); //can pass options here.
- // routers
- const authRouter = require("./routes/authRouter");
- const userRouter = require("./routes/userRouter");
- const productRouter = require("./routes/productRouter");

- app.use("/api/v1/auth", authRouter);
- app.use("/api/v1/users", userRouter);
- app.use("/api/v1/products", productRouter);

- app.use(notFoundMiddleware);
- app.use(errorHandlerMiddlewar);

- const port = process.env.PORT || 3000;
- const start = async () => {
- try {
-       await connectDB(process.env.MONGO_URI);
-       app.listen(port, () =>
-       console.log(`Server is listening on port ${port}...`)
-       );
- } catch (error) {
- console.error(error);
- }
- };

- start();

##### sample error handlers

- const { StatusCodes } = require("http-status-codes");
- const User = require("../models/UserModel");
- const { CustomError } = require("@apurva2307/node-starter");
- const { attachCookiesToResponse, createTokenUser } = require("../utils");

- const register = async (req, res) => {
- const { name, email, password } = req.body;
- const isEmailExists = await User.findOne({ email });
- if (isEmailExists) {
- throw new CustomError.BadRequestError("Email already exists.");
- }
- const firstUser = (await User.countDocuments({})) === 0;
- const role = firstUser ? "admin" : "user";
- const user = await User.create({ name, email, password, role });
- const tokenUser = createTokenUser(user);
- attachCookiesToResponse({ res, user: tokenUser });

- res.status(StatusCodes.CREATED).json({ user: tokenUser });
- };
