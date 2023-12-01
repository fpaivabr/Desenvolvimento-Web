"use strict";

let produtos = []; // Lista de produtos

exports.listarTodos = (req, res) => {
  res.json(produtos);
};

exports.listarPorCodigo = (req, res) => {
  const produto = produtos.find((p) => p.codigo === req.params.codigo);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ error: true, message: "Produto não encontrado" });
  }
};

exports.inserirProduto = (req, res) => {
  const { codigo, nome, preco } = req.body;
  const produtoExistente = produtos.find(
    (produto) => produto.codigo === codigo
  );
  if (produtoExistente) {
    res.status(409).json({ error: true, message: "Código já existente" });
  } else {
    const novoProduto = { codigo, nome, preco };
    produtos.push(novoProduto);
    res.json({ message: "Produto adicionado com sucesso", data: novoProduto });
  }
};

exports.atualizarProduto = (req, res) => {
  const { codigo, nome, preco } = req.body;
  const produto = produtos.find((p) => p.codigo === req.params.codigo);
  if (produto) {
    produto.nome = nome;
    produto.preco = preco;
    res.json({ message: "Produto atualizado com sucesso", data: produto });
  } else {
    res.status(404).json({ error: true, message: "Produto não encontrado" });
  }
};

exports.removerProduto = (req, res) => {
  const index = produtos.findIndex((p) => p.codigo === req.params.codigo);
  if (index !== -1) {
    produtos.splice(index, 1);
    res.json({ message: "Produto removido com sucesso" });
  } else {
    res.status(404).json({ error: true, message: "Produto não encontrado" });
  }
};
