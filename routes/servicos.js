const { Router } = require("express");
const { Servico } = require("../database/servico");

const router = Router();

router.post("/servicos", async (req, res) => {
  const { nome, preco } = req.body;

  try {
    const novoServico = await Servico.create({ nome, preco });
    res.status(201).json(novoServico);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

module.exports = router;