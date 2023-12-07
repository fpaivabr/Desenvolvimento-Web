package com.projeto.gerenciadorlivros.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projeto.gerenciadorlivros.model.Livro;
import com.projeto.gerenciadorlivros.service.LivroService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(LivroController.class)
public class LivroControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LivroService livroService;

    private Livro livro;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        livro = new Livro();
        livro.setId(1L);
        livro.setTitulo("Livro Teste");
        livro.setIsbn("123456789");
        // Configurar autor se necessário
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldGetAllLivros() throws Exception {
        when(livroService.findAll()).thenReturn(Arrays.asList(livro));

        mockMvc.perform(get("/livros")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].titulo", is(livro.getTitulo())));
    }

    @Test
    void shouldGetLivroById() throws Exception {
        when(livroService.findById(1L)).thenReturn(Optional.of(livro));

        mockMvc.perform(get("/livros/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo", is(livro.getTitulo())));
    }

    @Test
    void shouldCreateLivro() throws Exception {
        when(livroService.save(ArgumentMatchers.any(Livro.class))).thenReturn(livro);

        mockMvc.perform(post("/livros")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(livro)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo", is(livro.getTitulo())));
    }

    @Test
    void shouldUpdateLivro() throws Exception {
        when(livroService.update(eq(1L), ArgumentMatchers.any(Livro.class))).thenReturn(Optional.of(livro));

        mockMvc.perform(put("/livros/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(livro)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo", is(livro.getTitulo())));
    }

    @Test
    void shouldDeleteLivro() throws Exception {
        when(livroService.delete(1L)).thenReturn(true);

        mockMvc.perform(delete("/livros/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturnNotFoundWhenDeletingNonExistingLivro() throws Exception {
        when(livroService.delete(1L)).thenReturn(false);

        mockMvc.perform(delete("/livros/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}

