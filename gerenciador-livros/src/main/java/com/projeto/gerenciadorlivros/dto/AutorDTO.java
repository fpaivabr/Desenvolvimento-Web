package com.projeto.gerenciadorlivros.dto;

import lombok.Data;

@Data
public class AutorDTO {
    private Long id;
    private String nome;

    // Lombok gera automaticamente getters, setters e um construtor padrão
}
