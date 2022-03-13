require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//other packages
const morgan = require("morgan");
const xssClean = require("xss-clean");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

app.set("trust proxy", 1);
function setRateLimiter(options = { windowMs: 15 * 60 * 1000, max: 60 }) {
  app.use(rateLimiter(options));
}
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use(express.static("./public"));

module.exports = { app, setRateLimiter };
