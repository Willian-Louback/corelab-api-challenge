const express = require("express");
const app = express();
const routes = require("./routes/routes");
const connectToDb = require("./database/db");

require("dotenv").config({ path: "./secure/.env" });

const port = process.env.PORT || 3000;

connectToDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Servidor online na porta ${port}`));