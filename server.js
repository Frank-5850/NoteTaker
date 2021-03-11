const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

const clientRoutes = require("./routes/clientRoutes");
const apiRoutes = require("./routes/apiRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", clientRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
