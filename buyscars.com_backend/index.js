const env = require("env2")("./.env"); //loading enviromnent variables from file
//third party modules
const express = require("express");
const cors = require("cors");

//Local Modules
const { connection } = require("./dB/dB.connection");

//Router Modules
const { userRouter } = require("./Routes/Users.routes");
const { oemRouter } = require("./Routes/OEM_specs.routes");
const { inventoryRouter } = require("./Routes/Dealer_inventory.routes");
//middleware Modules

//middleware : express.json ,cors , QueryHandler (handles search,paginate,filter,sort) , AuthenticationHandler (handles token authentication)
const {
  AuthenticationHandler,
} = require("./Middleware/Authentication.middleware");

const { QueryHandler } = require("./Middleware/QueryHandler.middleware");

//initialize  app
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to buyscars backend api");
});

app.use("/user", userRouter); //login and signup

app.use(AuthenticationHandler); //auth middlware adds dealerId to every request

app.use(QueryHandler); //creates a queries,sort and pagination parameters for model param object

app.use("/oem_specs", oemRouter);
app.use("/inventory", inventoryRouter);
app.listen(process.env.SERVER_PORT, async () => {
  try {
    console.log("listening on port " + process.env.SERVER_PORT);
    await connection;
    console.log("succefully connnected to mongoDb atlas");
  } catch (error) {
    console.log(error);
  }
});
