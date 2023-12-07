package com.projeto.gerenciadorlivros.mapper;

import com.projeto.gerenciadorlivros.dto.LivroDTO;
import com.projeto.gerenciadorlivros.model.Livro;
import com.projeto.gerenciadorlivros.model.Autor;
import com.projeto.gerenciadorlivros.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface LivroMapper {

    LivroMapper INSTANCE = Mappers.getMapper(LivroMapper.class);

    @Autowired
    AutorRepository autorRepository = null; // Injeção de dependência para o repositório

    default LivroDTO livroToLivroDTO(Livro livro) {
        if (livro == null) {
            return null;
        }

        LivroDTO livroDTO = new LivroDTO();
        livroDTO.setId(livro.getId());
        livroDTO.setTitulo(livro.getTitulo());
        livroDTO.setIsbn(livro.getIsbn());
        if (livro.getAutor() != null) {
            livroDTO.setNomeAutor(livro.getAutor().getNome());
        }

        return livroDTO;
    }

    default Livro livroDTOToLivro(LivroDTO livroDTO) {
        if (livroDTO == null) {
            return null;
        }

        Livro livro = new Livro();
        livro.setId(livroDTO.getId());
        livro.setTitulo(livroDTO.getTitulo());
        livro.setIsbn(livroDTO.getIsbn());

        // Mapear 'nomeAutor' para um objeto 'Autor'
        if (livroDTO.getNomeAutor() != null && autorRepository != null) {
            Autor autor = autorRepository.findByNome(livroDTO.getNomeAutor());
            livro.setAutor(autor);
        }

        return livro;
    }
}
