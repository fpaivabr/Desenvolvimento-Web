package com.produtosapi.gestaoprodutos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import javax.validation.ConstraintViolationException;

/**
 * Classe responsável por tratar globalmente as exceções lançadas pela aplicação.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Método para tratar exceções do tipo EntidadeNaoEncontradaException.
     * @param ex A exceção lançada.
     * @return ResponseEntity com o status HTTP e a mensagem da exceção.
     */
    @ExceptionHandler(EntidadeNaoEncontradaException.class)
    public ResponseEntity<String> handleEntidadeNaoEncontrada(EntidadeNaoEncontradaException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    /**
     * Método para tratar exceções do tipo ConstraintViolationException.
     * @param ex A exceção lançada.
     * @return ResponseEntity com o status HTTP e a mensagem de erro.
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintViolation(ConstraintViolationException ex) {
        String mensagemErro = "Violação de restrição: " + ex.getMessage();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensagemErro);
    }

    /**
     * Método para tratar todas as outras exceções.
     * @param ex A exceção lançada.
     * @return ResponseEntity com o status HTTP e a mensagem de erro.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro: " + ex.getMessage());
    }
}

/**
 * Classe de exceção personalizada para entidades não encontradas.
 */
class EntidadeNaoEncontradaException extends RuntimeException {
    /**
     * Construtor da classe.
     * @param message A mensagem de erro.
     */
    public EntidadeNaoEncontradaException(String message) {
        super(message);
    }
}