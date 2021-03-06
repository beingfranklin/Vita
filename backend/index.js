const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const connectMongo = require("./config/MongoConnect");
const traits = require("./routes/traits");
const recs = require("./routes/recs");
const share = require("./routes/share");

dotenv.load({ path: ".env" });

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(compression());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/recs", recs);
app.use("/traits", traits);
app.use("/share", share);

app.get("/", (req, res) => {
  res.json({ text: "Dummy End Point" });
});

connectMongo();

app.listen(app.get("port"), () => {
  console.log(`App running on port ${app.get("port")}`);
});
