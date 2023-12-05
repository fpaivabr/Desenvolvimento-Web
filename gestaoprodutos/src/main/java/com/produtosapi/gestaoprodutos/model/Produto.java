package com.produtosapi.gestaoprodutos.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.validation.constraints.DecimalMin;

/**
 * Classe modelo para a entidade Produto.
 * Anotada com @Entity para indicar que é uma entidade JPA.
 */
@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do produto não pode estar vazio.")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres.")
    private String nome;

    @Size(max = 500, message = "A descrição não pode ultrapassar 500 caracteres.")
    private String descricao;

    @NotNull(message = "O preço do produto é obrigatório.")
    @DecimalMin(value = "0.01", message = "O preço deve ser maior que zero.")
    private Double preco;

    // Construtor vazio necessário para o JPA
    public Produto() {
    }

    // Getters e setters para cada campo da entidade

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    // toString opcional, pode ser útil para log ou depuração

    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                '}';
    }
}
