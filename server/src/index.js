require("dotenv").config();
const express = require("express");
const cors = require("cors");
const suppliersRouter = require("./routes/suppliers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/suppliers", suppliersRouter);

app.use((err, req, res, next) => {
  // Erro generico para nao expor stack em producao
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: "Erro interno." });
});

const port = Number.parseInt(process.env.PORT, 10) || 3333;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API rodando na porta ${port}`);
});
