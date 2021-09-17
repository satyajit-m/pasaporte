const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

//Routes

//Register and login routes

app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));

app.use("/apply", require("./routes/apply"));

//police
app.use("/police",require("./routes/police"))

//admin
//app.use("/admin",require("./routes/admin"))

app.listen(5000, () => {
  console.log(" Server is running on 5000 ");
});
