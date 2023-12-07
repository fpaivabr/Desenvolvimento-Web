package com.projeto.gerenciadorlivros.service;

import com.projeto.gerenciadorlivros.model.Livro;
import com.projeto.gerenciadorlivros.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    @Autowired
    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public List<Livro> findAll() {
        return livroRepository.findAll();
    }

    public Optional<Livro> findById(Long id) {
        return livroRepository.findById(id);
    }

    public Livro save(Livro livro) {
        return livroRepository.save(livro);
    }

    public Optional<Livro> update(Long id, Livro livroDetails) {
        return livroRepository.findById(id)
                .map(livro -> {
                    livro.setTitulo(livroDetails.getTitulo());
                    livro.setIsbn(livroDetails.getIsbn());
                    livro.setAutor(livroDetails.getAutor());
                    return livroRepository.save(livro);
                });
    }

    public boolean delete(Long id) {
        return livroRepository.findById(id)
                .map(livro -> {
                    livroRepository.delete(livro);
                    return true;
                }).orElse(false);
    }
}

