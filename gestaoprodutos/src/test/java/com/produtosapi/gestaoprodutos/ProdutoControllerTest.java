package com.produtosapi.gestaoprodutos;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Classe de testes para o controlador de produtos.
 */
@SpringBootTest
@AutoConfigureMockMvc
public class ProdutoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    /**
     * Testa se a rota "/produtos" retorna o status 200.
     *
     * @throws Exception Exceção lançada se o teste falhar.
     */
    @Test
    void quandoGetProdutos_retornaStatus200() throws Exception {
        mockMvc.perform(get("/produtos"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }
}
