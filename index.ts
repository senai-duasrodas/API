const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const user = require("./routes/Usuario/User");
const equipamento = require("./routes/Equipamento/Equipamento");
const localInstalacao = require("./routes/LocalInstalacao/LocalInstalacao");
const centroTrabalho = require("./routes/CentroTrabalho/CentroTrabalho");
const tipoOrdem = require("./routes/TipoOrdem/TipoOrdem");

app.use("/users", user);

app.use("/equipamento",equipamento)

app.use("/local-instalacao",localInstalacao)

app.use("/centro-trabalho",centroTrabalho)

app.use("/tipo-ordem",tipoOrdem)


app.get("/", (req: any, res: any) => {
  res.send("deu boa");
});

app.listen(3000, function () {
  console.log('Ouvindo na porta 3000!');
});
