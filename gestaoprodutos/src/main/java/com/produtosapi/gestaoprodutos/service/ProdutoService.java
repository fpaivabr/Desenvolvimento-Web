package com.produtosapi.gestaoprodutos.service;

import com.produtosapi.gestaoprodutos.model.Produto;
import com.produtosapi.gestaoprodutos.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Classe de serviço para gerenciar operações relacionadas a produtos.
 */
@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    /**
     * Lista todos os produtos.
     * @return uma lista de produtos.
     */
    public List<Produto> listarTodosProdutos() {
        return produtoRepository.findAll();
    }

    /**
     * Busca um produto pelo ID.
     * @param id o ID do produto.
     * @return um Optional contendo o produto, se encontrado.
     */
    public Optional<Produto> buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    /**
     * Salva um novo produto ou atualiza um existente.
     * @param produto o produto a ser salvo ou atualizado.
     * @return o produto salvo.
     */
    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    /**
     * Atualiza um produto existente.
     * @param id o ID do produto existente.
     * @param detalhesProduto o produto com as atualizações.
     * @return um Optional contendo o produto atualizado, se encontrado.
     */
    public Optional<Produto> atualizarProduto(Long id, Produto detalhesProduto) {
        return produtoRepository.findById(id).map(produtoExistente -> {
            produtoExistente.setNome(detalhesProduto.getNome());
            produtoExistente.setDescricao(detalhesProduto.getDescricao());
            produtoExistente.setPreco(detalhesProduto.getPreco());
            return produtoRepository.save(produtoExistente);
        });
    }

    /**
     * Exclui um produto pelo ID.
     * @param id o ID do produto a ser excluído.
     * @return true se o produto foi excluído com sucesso, false caso contrário.
     */
    public boolean excluirProduto(Long id) {
        return produtoRepository.findById(id).map(produto -> {
            produtoRepository.delete(produto);
            return true;
        }).orElse(false);
    }
}
