// Importações principais e variáveis de ambiente
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const compression = require("compression");

// Configuração do App
const app = express();
app.use(express.json()); // Possibilitar transitar dados usando JSON
app.use(morgan("dev"));

//Configuração do compression - Desempenho
app.use(compression());

// Configuração do Helmet - Segurança
app.use(helmet());

// Configuração de sessão - Segurança
app.use(session(
  {
    secret: "sagdasdasdgusag",
    name: "sessionId1",
    resave: true,
    saveUninitialized: true,
    cookie: {secure: true,
              httpOnly: true,
            }
  }
));

// Configurações de acesso
app.use(cors({ origin: "http://localhost:3000" }));

// Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); // efetivar a conexão

// Definição de Rotas
const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");
const rotasPedidos = require("./routes/pedidos");
const rotasProdutos = require("./routes/produtos");
const rotasServicos = require("./routes/servicos");
const rotasAgendamentos = require("./routes/agendamentos");
const rotasDashboard = require("./routes/dashboard")


// Juntar ao app as rotas dos arquivos
app.use(rotasClientes); // Configurar o grupo de rotas no app
app.use(rotasPets);
app.use(rotasPedidos); 
app.use(rotasProdutos);
app.use(rotasServicos);
app.use(rotasAgendamentos);
app.use(rotasDashboard);


// Escuta de eventos (listen)
app.listen(3001, () => {
  // Gerar as tabelas a partir do model
  // Force = apaga tudo e recria as tabelas
  connection.sync();
  console.log("Servidor rodando em http://localhost:3001/");
});
