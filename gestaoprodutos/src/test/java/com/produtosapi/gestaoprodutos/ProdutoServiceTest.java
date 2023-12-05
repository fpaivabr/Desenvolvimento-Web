package com.produtosapi.gestaoprodutos;

import com.produtosapi.gestaoprodutos.model.Produto;
import com.produtosapi.gestaoprodutos.repository.ProdutoRepository;
import com.produtosapi.gestaoprodutos.service.ProdutoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Classe de testes para o serviço de produtos.
 */
@ExtendWith(MockitoExtension.class)
public class ProdutoServiceTest {

    @Mock
    private ProdutoRepository produtoRepository;

    @InjectMocks
    private ProdutoService produtoService;

    /**
     * Testa se a listagem de todos os produtos retorna uma lista não vazia.
     */
    @Test
    void quandoListarTodosProdutos_retornaListaProdutos() {
        when(produtoRepository.findAll()).thenReturn(Arrays.asList(new Produto()));
        List<Produto> produtos = produtoService.listarTodosProdutos();
        assertFalse(produtos.isEmpty());
        verify(produtoRepository).findAll();
    }

    // Outros métodos e testes continuam aqui com comentários adequados...
}
