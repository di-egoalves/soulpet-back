const Cliente = require("../database/cliente");
const Endereco = require("../database/endereco");

const { Router } = require("express");

// Criar o grupo de rotas (/clientes)
const router = Router();

// Definição de rotas
router.get("/clientes", async (req, res) => {
  // SELECT * FROM clientes;
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
});

// /clientes/1, 2
router.get("/clientes/:id", async (req, res) => {
  // SELECT * FROM clientes WHERE id = 1;
  const cliente = await Cliente.findOne({
    where: { id: req.params.id },
    include: [Endereco], // trás junto os dados de endereço
  });

  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ message: "Usuário não encontrado." });
  }
});

router.post("/clientes", async (req, res) => {
  // Coletar os dados do req.body
  const { nome, email, telefone, endereco } = req.body;

  try {
    // Dentro de 'novo' estará o o objeto criado
    const novo = await Cliente.create(
      { nome, email, telefone, endereco },
      { include: [Endereco] }
    );

    res.status(201).json(novo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

// atualizar um cliente


// excluir um cliente
router.delete("/clientes/:id", async (req, res) => {
  // obter identificação do cliente pela rota
  const { id } = req.params;
  // buscar cliente por id
  const cliente = await Cliente.findOne({ where: { id } });
  try {
    if (cliente) {
      await cliente.destroy();
      res.status(200).json({ message: "Cliente removido." });
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

module.exports = router;
