package com.projeto.gerenciadorlivros.repository;

import com.projeto.gerenciadorlivros.model.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutorRepository extends JpaRepository<Autor, Long> {

    Autor findByNome(String nomeAutor);
}

