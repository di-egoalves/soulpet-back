const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require ("./pet");

const Servico = connection.define("servico", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

const Agendamento = connection.define("agendamento", {
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
});

// relacionamentos
Pet.belongsToMany(Servico, {through: Agendamento});
Servico.belongsToMany(Pet, {through: Agendamento});


module.exports = {
    Servico,
    Agendamento
};