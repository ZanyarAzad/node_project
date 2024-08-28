const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./router/user_route");
const app = express();

app.use(bodyParser.json());
app.use("/api", userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
