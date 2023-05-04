
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

//ROTA Get por ID
router.get("/agendamentos/:id", async (req, res) => {
  const { id } = req.params;

  const agendamento = await Agendamento.findByPk(id);
  if (agendamento) {
    res.json(agendamento);
  } else {
    res.status(404).json({ message: "Agendamento não encontrado." });
  }
});

//ROTA PUT
router.put("/agendamentos/:id", async (req, res) => {

  const { petId, servicoId, dataAgendada, realizada} = req.body;

  const agendamento = await Agendamento.findByPk(req.params.id);

    try {
    if (agendamento) {
            await Agendamento.update(
        { petId, servicoId, dataAgendada, realizada },
        { where: { id: req.params.id } } 
      );
      
      res.json({ message: "O seu agendamento foi editado." });
    } else {
      
      res.status(404).json({ message: "O agendamento não foi encontrado." });
    }
  } catch (err) {    
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//Rota DELETE UM AGENDAMENTO
router.delete('/agendamentos/:id', async (req, res) => {
  const { id } = req.params;
  const agendamento = await Agendamento.findByPk(id);

  try {
      if(agendamento){
          await agendamento.destroy();
          res.status(200).json({ message: 'Agendamento deletado' });
      }else{
          res.status(404).json({ message: 'Não encontramos esse agendamento' });
      }

  } catch (error) {
      res.status(500).json({ message: 'Um erro aconteceu' });
  }
});

//ROTA DELETE TODOS AGENDAMENTOS
router.delete("/agendamentos/", async (req,res)=> {
  try {
      await Agendamento.destroy({where: {}});
      res.json({message:"Todos os Agendamentos deletados com sucesso"})
  } catch(err){
      console.log(err);
      res.status(500).json({message:"Um erro aconteceu!"})
  }
});

    module.exports = router;

