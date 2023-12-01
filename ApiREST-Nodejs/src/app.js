const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

// Ativa o CORS para todas as requisições
app.use(cors());

// Suporte para JSON no corpo das requisições
app.use(bodyParser.json());

// Servir arquivos estáticos
app.use(express.static('src/views'));

// Rotas para produtos
app.use('/produtos', produtoRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('Servidor Node.js está rodando');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
