// External imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
// Internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();
// database connection
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.rjnekog.mongodb.net/text?retryWrites=true&w=majority`;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set  view engine
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found error handler
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("App listening on port " + process.env.PORT);
});
app.get("/", (req, res) => {
  res.send("Chat Application server in running");
});
