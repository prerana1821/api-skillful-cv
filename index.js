const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { initializeDBConnection } = require("./db/db.connect");
const resume = require("./routes/resumes.router");
const aisuggestions = require("./routes/aisuggestions.router");

const { errorHandler } = require("./middlewares/error-handler.middleware");
const { routeNotFound } = require("./middlewares/route-not-found.middleware");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/resumes", resume);
app.use("/ai-suggestions", aisuggestions);

app.get("/", (req, res) => {
  res.json({ success: true, data: "Hello skillful CV!" });
});

app.use(routeNotFound);
app.use(errorHandler);

initializeDBConnection().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
