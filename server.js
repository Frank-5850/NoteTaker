const express = require("express");
const app = express();
const PORT = 5000;

const clientRoutes = require("./routes/clientRoutes");

app.use("/", clientRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
