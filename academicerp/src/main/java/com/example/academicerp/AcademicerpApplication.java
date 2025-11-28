package com.example.academicerp;

import com.example.academicerp.auth.config.GoogleOAuthProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(GoogleOAuthProperties.class)
public class AcademicerpApplication {
    public static void main(String[] args) {
        SpringApplication.run(AcademicerpApplication.class, args);
    }
}