const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const user = require("./routes/Usuario/User");

app.use("/users", user);

app.get("/", (req: any, res: any) => {
  res.send("deu boa");
});

app.listen(3000, function () {
  console.log('Ouvindo na porta 3000!');
});
