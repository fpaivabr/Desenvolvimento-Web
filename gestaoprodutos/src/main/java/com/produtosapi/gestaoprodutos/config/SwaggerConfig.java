package com.produtosapi.gestaoprodutos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springdoc.core.GroupedOpenApi;

/**
 * Configuração do Swagger para documentação da API.
 */
@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .pathsToMatch("/produtos/**")
                .build();
    }
}
