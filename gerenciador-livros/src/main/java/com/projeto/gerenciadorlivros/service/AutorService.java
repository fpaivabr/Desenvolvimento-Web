package com.projeto.gerenciadorlivros.service;

import com.projeto.gerenciadorlivros.model.Autor;
import com.projeto.gerenciadorlivros.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorService {

    private final AutorRepository autorRepository;

    @Autowired
    public AutorService(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    public List<Autor> findAll() {
        return autorRepository.findAll();
    }

    public Optional<Autor> findById(Long id) {
        return autorRepository.findById(id);
    }

    public Autor save(Autor autor) {
        return autorRepository.save(autor);
    }

    public Optional<Autor> update(Long id, Autor autorDetails) {
        return autorRepository.findById(id)
                .map(autor -> {
                    autor.setNome(autorDetails.getNome());
                    return autorRepository.save(autor);
                });
    }

    public boolean delete(Long id) {
        return autorRepository.findById(id)
                .map(autor -> {
                    autorRepository.delete(autor);
                    return true;
                }).orElse(false);
    }
}

