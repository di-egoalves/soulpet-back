const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Servico = require("./servico");
const Pet = require("./pet");

const Agendamento = connection.define("agendamento", {
    dataAgendada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    realizada: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: false,
    },
});

Pet.hasMany(Agendamento)
Servico.hasMany(Agendamento)


module.exports = Agendamento;
