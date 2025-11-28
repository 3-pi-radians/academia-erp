package com.example.academicerp.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "OAuth2";
        
        return new OpenAPI()
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development Server")
                ))
                .info(new Info()
                        .title("Academic ERP API Documentation")
                        .description("""
                            This is the API documentation for the Academic ERP system.
                            Most endpoints require authentication via Google OAuth2.
                            To test authenticated endpoints, first sign in via the Google login page.
                            """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Academic ERP Team")
                                .email("support@academicerp.com")
                                .url("https://academicerp.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.OAUTH2)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("OAuth2 authentication with Google")
                        )
                );
    }
}
