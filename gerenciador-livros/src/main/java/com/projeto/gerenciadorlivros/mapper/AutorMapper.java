package com.projeto.gerenciadorlivros.mapper;

import com.projeto.gerenciadorlivros.model.Autor;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper
public interface AutorMapper {

    @Named("map")
    default Autor map(String nomeAutor) {
        Autor autor = new Autor();
        autor.setNome(nomeAutor);
        return autor;
    }

    @Named("autorToString")
    default String autorToString(Autor autor) {
        return autor.getNome();
    }
}