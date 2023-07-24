const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeDBConnection } = require("./db/db.connect");
const resume = require("./routes/resumes.router");
const aisuggestions = require("./routes/aisuggestions.router");
// const user = require("./routes/user.router");
// const category = require("./routes/categories.router");
const { errorHandler } = require("./middlewares/error-handler.middleware");
const { routeNotFound } = require("./middlewares/route-not-found.middleware");

const app = express();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

initializeDBConnection();

app.use("/resumes", resume);
app.use("/ai-suggestions", aisuggestions);
// app.use("/products", product);
// app.use("/categories", category);
// app.use("/user-details", authVerify, user);

app.get("/", (req, res) => {
  res.json({ success: true, data: "Hello preStore!" });
});

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server started at", PORT);
});
