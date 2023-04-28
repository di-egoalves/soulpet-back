
const express = require('express');
const Agendamento = require('../database/agendamento');
const router = express.Router();

//Rota Post
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

//Rota Get
router.get("/agendamentos", async (req,res) => {    
  try{
  const listaAgendamento = await Agendamento.findAll();
  res.json(listaAgendamento)
  } catch (err) {
      res.status(500).json({message:"Um erro aconteceu!"})
  }
});

    module.exports = router;
