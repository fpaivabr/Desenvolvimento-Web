const db = require('../models/produto');

// Listar todos os produtos
const listarTodos = (req, res) => {
  db.all("SELECT * FROM produto", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "Sucesso",
      "data": rows
    });
  });
};

// Listar um produto por código
const listarPorCodigo = (req, res) => {
  const codigo = req.params.codigo;
  db.get("SELECT * FROM produto WHERE codigo = ?", [codigo], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "Sucesso",
      "data": row
    });
  });
};

// Inserir novo produto
const inserirProduto = (req, res) => {
  const { codigo, nome, preco } = req.body;

  // Validação dos dados
  if (!codigo || !nome || preco == null) {
    return res.status(400).json({ "error": "Faltam dados do produto" });
  }

  const sql = 'INSERT INTO produto (codigo, nome, preco) VALUES (?, ?, ?)';
  db.run(sql, [codigo, nome, preco], function(err) {
    if (err) {
      return res.status(400).json({ "error": err.message });
    }
    res.json({
      "message": "Produto inserido com sucesso",
      "id": this.lastID
    });
  });
};

// Atualizar produto
const atualizarProduto = (req, res) => {
  const { nome, preco } = req.body;
  const codigo = req.params.codigo;

  // Validação dos dados
  if (!nome || preco == null) {
    return res.status(400).json({ "error": "Faltam dados para atualização do produto" });
  }

  const sql = 'UPDATE produto SET nome = ?, preco = ? WHERE codigo = ?';
  db.run(sql, [nome, preco, codigo], function(err) {
    if (err) {
      return res.status(400).json({ "error": err.message });
    }
    res.json({
      "message": "Produto atualizado com sucesso",
      "data": this.changes
    });
  });
};

// Remover produto
const removerProduto = (req, res) => {
  const codigo = req.params.codigo;

  const sql = 'DELETE FROM produto WHERE codigo = ?';
  db.run(sql, codigo, function(err) {
    if (err) {
      return res.status(400).json({ "error": err.message });
    }
    res.json({
      "message": "Produto removido com sucesso",
      "data": this.changes
    });
  });
};

module.exports = {
  listarTodos,
  listarPorCodigo,
  inserirProduto,
  atualizarProduto,
  removerProduto
};
