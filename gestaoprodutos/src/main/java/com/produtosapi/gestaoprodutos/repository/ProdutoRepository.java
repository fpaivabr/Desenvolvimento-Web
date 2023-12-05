package com.produtosapi.gestaoprodutos.repository;

import com.produtosapi.gestaoprodutos.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}

