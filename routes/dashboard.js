const { Router } = require("express");
const router = Router();
const Cliente = require("../database/cliente");
const Pet = require("../database/pet");
const Produto = require("../database/produto");
const Agendamento = require("../database/agendamento");
const Servico = require("../database/servico");

router.get("/dashboard", async (req, res) => {
  try {
    const [totalCliente, totalPet, totalProduto, totalAgendamento, totalServico] = await Promise.all([
      Cliente.count(),
      Pet.count(),
      Produto.count(),
      Agendamento.count(),
      Servico.count(),
    ]);
    res.json({
      totalCliente,
      totalAgendamento,
      totalPet,
      totalServico,
      totalProduto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "um erro aconteceu" });
  }
});

module.exports = router;
