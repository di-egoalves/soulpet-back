
const express = require('express');
const Agendamento = require('../database/agendamento');
const router = express.Router();

router.post('/agendamentos', async (req, res) => {
    const {petId, servicoId, dataAgendada, realizada } = req.body;

    try {
        const agendamento = await Agendamento.create({ petId, servicoId, dataAgendada, realizada });
        res.status(201).json(agendamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro em agendar' });
    }
});

    module.exports = router;
    