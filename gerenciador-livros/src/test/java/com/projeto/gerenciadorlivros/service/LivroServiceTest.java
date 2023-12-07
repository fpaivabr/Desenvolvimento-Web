package com.projeto.gerenciadorlivros.service;

import com.projeto.gerenciadorlivros.model.Livro;
import com.projeto.gerenciadorlivros.repository.LivroRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class LivroServiceTest {

    @Mock
    private LivroRepository livroRepository;

    @InjectMocks
    private LivroService livroService;

    private Livro livro;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        livro = new Livro();
        livro.setId(1L);
        livro.setTitulo("Livro Teste");
        livro.setIsbn("123456789");
        // Configurar autor se necessário
    }

    @Test
    public void findAll_ShouldReturnListOfLivros() {
        when(livroRepository.findAll()).thenReturn(Arrays.asList(livro));

        List<Livro> result = livroService.findAll();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals(livro, result.get(0));
    }

    @Test
    public void findById_ShouldReturnLivro() {
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));

        Optional<Livro> result = livroService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(livro, result.get());
    }

    @Test
    public void save_ShouldReturnSavedLivro() {
        when(livroRepository.save(any(Livro.class))).thenReturn(livro);

        Livro savedLivro = livroService.save(new Livro());

        assertNotNull(savedLivro);
        assertEquals(livro, savedLivro);
    }

    @Test
    public void update_ShouldReturnUpdatedLivro() {
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));
        when(livroRepository.save(any(Livro.class))).thenReturn(livro);

        Optional<Livro> updatedLivro = livroService.update(1L, new Livro());

        assertTrue(updatedLivro.isPresent());
        assertEquals(livro, updatedLivro.get());
    }

    @Test
    public void delete_ShouldReturnTrueWhenSuccessful() {
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));
        doNothing().when(livroRepository).delete(livro);

        boolean isDeleted = livroService.delete(1L);

        assertTrue(isDeleted);
    }

    @Test
    public void delete_ShouldReturnFalseWhenNotFound() {
        when(livroRepository.findById(1L)).thenReturn(Optional.empty());

        boolean isDeleted = livroService.delete(1L);

        assertFalse(isDeleted);
    }
}
