package com.projeto.gerenciadorlivros.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projeto.gerenciadorlivros.model.Autor;
import com.projeto.gerenciadorlivros.service.AutorService;
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
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AutorController.class)
public class AutorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AutorService autorService;

    private Autor autor;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        autor = new Autor();
        autor.setId(1L);
        autor.setNome("Autor Teste");
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldGetAllAutores() throws Exception {
        List<Autor> autores = Arrays.asList(autor);
        when(autorService.findAll()).thenReturn(autores);

        mockMvc.perform(get("/autores")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].nome", is(autor.getNome())));
    }

    @Test
    void shouldGetAutorById() throws Exception {
        when(autorService.findById(1L)).thenReturn(Optional.of(autor));

        mockMvc.perform(get("/autores/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is(autor.getNome())));
    }

    @Test
    void shouldCreateAutor() throws Exception {
        when(autorService.save(ArgumentMatchers.any(Autor.class))).thenReturn(autor);

        mockMvc.perform(post("/autores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(autor)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is(autor.getNome())));
    }

    @Test
    void shouldUpdateAutor() throws Exception {
        when(autorService.update(eq(1L), ArgumentMatchers.any(Autor.class))).thenReturn(Optional.of(autor));

        mockMvc.perform(put("/autores/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(autor)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome", is(autor.getNome())));
    }

    @Test
    void shouldDeleteAutor() throws Exception {
        when(autorService.delete(1L)).thenReturn(true);

        mockMvc.perform(delete("/autores/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturnNotFoundWhenDeletingNonExistingAutor() throws Exception {
        when(autorService.delete(1L)).thenReturn(false);

        mockMvc.perform(delete("/autores/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}

