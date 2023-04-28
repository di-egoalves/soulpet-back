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

router.get('/servicos', async (req, res) => {
    try {
        const { nome, preco } = req.query;
        const busca = {};
        if (nome) busca.nome = nome;
        if (preco) busca.preco = preco;
        const servicos = await Servico.findAll({ busca });
        res.json(servicos);
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro." });

    }
});

router.get('/servicos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const servico = await Servico.findByPk(id);
        if (servico) {
            res.json(servico);
        } else {
            res.status(404).json({ message: "Serviço não encontrado." })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocorreu um erro." });

    }
});

// para fazer = get/ put/ delete
module.exports = router;