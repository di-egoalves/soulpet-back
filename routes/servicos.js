const { Router } = require("express");
const Servico = require("../database/servico");

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

router.put("/servicos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    if (!nome) return res.status(400).json({ message: "O campo nome é obrigatório" });
    if (!preco) return res.status(400).json({ message: "O campo preço é obrigatório" });
    try {
        const servico = await Servico.findByPk(id);
        if (servico) {
            await servico.update({ nome, preco });
            res.status(200).json("Serviço editado com sucesso!")
        } else {
            res.status(404).json({ message: "O serviço não foi encontrado." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Ocorreu um erro, tente novamente." });
    }
});

router.delete("/servicos/all", async (req, res) => {
    try {
        await Servico.destroy({ where: {} });
        res.json({ message: "Todos os servicos foram deletados." })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." })
    }
});

router.delete("/servicos/:id", async (req, res) => {
    try {
        const servico = await Servico.findByPk(req.params.id);
        if (servico) {
            await servico.destroy();
            res.json({ message: "Serviço removido com sucesso." })
        } else {
            res.status(404).json({ message: "Serviço não encontrado." })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;