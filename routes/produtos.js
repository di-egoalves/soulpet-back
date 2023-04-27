
const { Router } = require("express");
const Produto = require("../database/produto");

const router = Router();

router.post("/produtos", async (req, res) => {
    const { nome, preco, descricao, desconto, dataDesconto, categoria } = req.body;

    // Realiza as validações necessárias
    const categoriasValidas = ['Higiene', 'Brinquedos', 'Conforto', 'Alimentação', 'Medicamentos'];
    if (!categoriasValidas.includes(categoria)) {
        return res.status(400).send('Informe uma categoria válida: Higiene, Brinquedos, Conforto, Alimentação, Medicamentos.');
    }

    if (new Date(dataDesconto) < new Date()) {
        return res.status(400).send('Data de desconto deve ser maior que a data atual.');
    }

    if (desconto < 0 || desconto >= 100) {
        return res.status(400).send('Desconto deve ser entre 1% e 100%.');
    }

    try {
        const novoProduto = await Produto.create(
            { nome, preco, descricao, desconto, dataDesconto, categoria }
        );
        res.status(201).json({ message: "Produto inserido com sucesso!", novoProduto });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;


