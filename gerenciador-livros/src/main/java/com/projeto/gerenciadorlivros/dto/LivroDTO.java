package com.projeto.gerenciadorlivros.dto;

import lombok.Data;

@Data
public class LivroDTO {
    private Long id;
    private String titulo;
    private String isbn;
    private String nomeAutor; // Nome do autor, não a entidade completa

    // Lombok gera os getters, setters, e um construtor padrão
}

