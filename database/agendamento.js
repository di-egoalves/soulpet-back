const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const { Agendamento } = require("./servico");

const PetServico = connection.define("petServico", {
    dataAgendada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    realizada: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

PetServico.belongsTo(Agendamento);

module.exports={PetServico}