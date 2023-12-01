const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Listar todos os produtos
router.get('/', produtoController.listarTodos);

// Listar um produto por código
router.get('/:codigo', produtoController.listarPorCodigo);

// Inserir novo produto
router.post('/', produtoController.inserirProduto);

// Atualizar produto existente
router.put('/:codigo', produtoController.atualizarProduto);

// Remover produto
router.delete('/:codigo', produtoController.removerProduto);

module.exports = router;
