package com.projeto.gerenciadorlivros.service;

import com.projeto.gerenciadorlivros.model.Autor;
import com.projeto.gerenciadorlivros.repository.AutorRepository;
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
public class AutorServiceTest {

    @Mock
    private AutorRepository autorRepository;

    @InjectMocks
    private AutorService autorService;

    private Autor autor;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        autor = new Autor();
        autor.setId(1L);
        autor.setNome("Autor Teste");
    }

    @Test
    public void findAll_ShouldReturnListOfAutores() {
        when(autorRepository.findAll()).thenReturn(Arrays.asList(autor));

        List<Autor> result = autorService.findAll();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals(autor, result.get(0));
    }

    @Test
    public void findById_ShouldReturnAutor() {
        when(autorRepository.findById(1L)).thenReturn(Optional.of(autor));

        Optional<Autor> result = autorService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(autor, result.get());
    }

    @Test
    public void save_ShouldReturnSavedAutor() {
        when(autorRepository.save(any(Autor.class))).thenReturn(autor);

        Autor savedAutor = autorService.save(new Autor());

        assertNotNull(savedAutor);
        assertEquals(autor, savedAutor);
    }

    @Test
    public void update_ShouldReturnUpdatedAutor() {
        when(autorRepository.findById(1L)).thenReturn(Optional.of(autor));
        when(autorRepository.save(any(Autor.class))).thenReturn(autor);

        Optional<Autor> updatedAutor = autorService.update(1L, new Autor());

        assertTrue(updatedAutor.isPresent());
        assertEquals(autor, updatedAutor.get());
    }

    @Test
    public void delete_ShouldReturnTrueWhenSuccessful() {
        when(autorRepository.findById(1L)).thenReturn(Optional.of(autor));
        doNothing().when(autorRepository).delete(autor);

        boolean isDeleted = autorService.delete(1L);

        assertTrue(isDeleted);
    }

    @Test
    public void delete_ShouldReturnFalseWhenNotFound() {
        when(autorRepository.findById(1L)).thenReturn(Optional.empty());

        boolean isDeleted = autorService.delete(1L);

        assertFalse(isDeleted);
    }
}
