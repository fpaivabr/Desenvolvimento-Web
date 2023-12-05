package com.produtosapi.gestaoprodutos.controller;

import com.produtosapi.gestaoprodutos.model.Produto;
import com.produtosapi.gestaoprodutos.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    /**
     * Obtém a lista de todos os produtos.
     */
    @GetMapping
    public List<Produto> getAllProdutos() {
        return produtoService.listarTodosProdutos();
    }

    /**
     * Obtém um produto por ID.
     *
     * @param id O ID do produto.
     * @return ResponseEntity contendo o produto ou NotFound se não encontrado.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable Long id) {
        Optional<Produto> produto = produtoService.buscarProdutoPorId(id);

        if (produto.isPresent()) {
            return ResponseEntity.ok(produto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Cria um novo produto.
     *
     * @param produto O produto a ser criado.
     * @return O produto criado.
     */
    @PostMapping
    public Produto createProduto(@Valid @RequestBody Produto produto) {
        return produtoService.salvarProduto(produto);
    }

    /**
     * Atualiza um produto existente.
     *
     * @param id             O ID do produto existente.
     * @param detalhesProduto O produto com as atualizações.
     * @return ResponseEntity contendo o produto atualizado ou NotFound se não encontrado.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto detalhesProduto) {
        Optional<Produto> produtoAtualizado = produtoService.atualizarProduto(id, detalhesProduto);

        if (produtoAtualizado.isPresent()) {
            return ResponseEntity.ok(produtoAtualizado.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Exclui um produto.
     *
     * @param id O ID do produto a ser excluído.
     * @return ResponseEntity indicando o sucesso da exclusão ou NotFound se não encontrado.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
        if (produtoService.excluirProduto(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}