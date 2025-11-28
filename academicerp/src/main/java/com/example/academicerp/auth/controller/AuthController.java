package com.example.academicerp.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal Object principal) {
        if (principal instanceof OidcUser oidc) {
            return ResponseEntity.ok(Map.of(
                    "name", oidc.getFullName() != null ? oidc.getFullName() : oidc.getGivenName(),
                    "email", oidc.getEmail()
            ));
        }
        if (principal instanceof OAuth2User oauth2) {
            String name = String.valueOf(oauth2.getAttributes().getOrDefault("name", oauth2.getName()));
            String email = String.valueOf(oauth2.getAttributes().getOrDefault("email", ""));
            return ResponseEntity.ok(Map.of("name", name, "email", email));
        }
        return ResponseEntity.status(401).build();
    }
}
