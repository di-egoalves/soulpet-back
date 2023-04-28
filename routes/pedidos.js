const Produto = require("../database/produto");
const Cliente = require("../database/cliente");
const Pedido = require("../database/pedido");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

router.post("/pedidos", async (req, res) => {
    const { codigo, quantidade, clienteId, produtoId} = req.body;
  
    try {
      const cliente = await Cliente.findByPk(clienteId);
      if (cliente) {
        const pet = await Pedido.create({ codigo, quantidade, clienteId, produtoId});
        res.status(201).json(pet);
      } else {
        res.status(404).json({ message: "Cliente não encontrado." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

  module.exports = router;