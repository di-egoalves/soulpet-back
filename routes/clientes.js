const Cliente = require("../database/cliente");
const Endereco = require("../database/endereco");
const Pets = require("../database/pet");
const PDFDocument = require('pdfkit');

const { Router } = require("express");

// Criar o grupo de rotas (/clientes)
const router = Router();

// Definição de rotas
router.get("/clientes", async (req, res) => {
  // SELECT * FROM clientes;
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
});

//rota busca clientes e pets
router.get('/relatorio', async (req, res) => {

  const relatorio = await Cliente.findAll({ include: [Endereco, Pets] });

  const doc = new PDFDocument();

  //define o nome do arquivo
  res.setHeader('Content-Disposition', 'attachment; filename="relatorioclientes.pdf"');

  // escreve as informações dos clientes no documento PDF
  doc.text('Relatório de clientes\n\n');
  relatorio.forEach(cliente => {
    // console.log(cliente);
    doc.text(`Nome: ${cliente.nome}`);
    doc.text(`Telefone: ${cliente.telefone}`);
    doc.text(`Email: ${cliente.email}`);
    doc.text(`Rua: ${cliente.endereco.rua}`);
    doc.text(`Número: ${cliente.endereco.numero}`);
    doc.text(`Cidade: ${cliente.endereco.cidade}`);
    doc.text(`CEP: ${cliente.endereco.rep}`);
    doc.text(`UF: ${cliente.endereco.uf}`);

    if (cliente.pets && cliente.pets.length > 0) {
      doc.text('Pets:');
      doc.text(`Quantidade de pets: ${cliente.pets.length}`);
      cliente.pets.forEach((pet) => {
        doc.text(`${pet.nome} - ${pet.tipo}`);
      });
    }

    doc.text('\n\n');
  });

  // envia o documento PDF como resposta para a solicitação
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);
  doc.end();
});


// /clientes/1, 2
router.get("/clientes/:id", async (req, res) => {
  // SELECT * FROM clientes WHERE id = 1;
  const cliente = await Cliente.findOne({
    where: { id: req.params.id },
    include: [Endereco, Pets], // trás junto os dados de endereço
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
router.put("/clientes/:id", async (req, res) => {
  // obter dados do corpo da requisão
  const { nome, email, telefone, endereco } = req.body;
  // obter identificação do cliente pelos parametros da rota
  const { id } = req.params;
  try {
    // buscar cliente pelo id passado
    const cliente = await Cliente.findOne({ where: { id } });
    // validar a existência desse cliente no banco de dados
    if (cliente) {
      // validar a existência desse do endereço passdo no corpo da requisição
      if (endereco) {
        await Endereco.update(endereco, { where: { clienteId: id } });
      }
      // atualizar o cliente com nome, email e telefone
      await cliente.update({ nome, email, telefone });
      res.status(200).json({ message: "Cliente editado." });
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

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

router.get("/clientes/:clienteId/endereco", async (req, res)=> {
  const clienteId = req.params.clienteId;

  const cliente = await Cliente.findOne({where: {Id: clienteId}, include: [Endereco],});
  if (cliente) {
    res.status(201).json(cliente);
  } else {
    res.status(404).json({ message: "Cliente inválido"})
  }

});
module.exports = router
