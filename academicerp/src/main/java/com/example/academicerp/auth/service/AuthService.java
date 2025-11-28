package com.example.academicerp.auth.service;

import com.example.academicerp.auth.config.GoogleOAuthProperties;
import com.example.academicerp.auth.dto.AuthTokenResponse;
import com.example.academicerp.auth.dto.AppAuthResponse;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Map;

@Service
public class AuthService {

    private static final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

    private final RestTemplate restTemplate = new RestTemplate();
    private final GoogleOAuthProperties props;

    public AuthService(GoogleOAuthProperties props) {
        this.props = props;
    }

    public AuthTokenResponse exchangeCodeForTokens(String code) {

        if (props.getClientId() == null || props.getClientSecret() == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Google OAuth is not configured");
        }

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("code", code);
        form.add("client_id", props.getClientId());
        form.add("client_secret", props.getClientSecret());
        form.add("redirect_uri", props.getRedirectUri());
        form.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAcceptCharset(Arrays.asList(StandardCharsets.UTF_8));

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(form, headers);

        try {
            ResponseEntity<AuthTokenResponse> response =
                    restTemplate.exchange(GOOGLE_TOKEN_URL,
                            HttpMethod.POST,
                            entity,
                            AuthTokenResponse.class);

            return response.getBody();

        } catch (RestClientResponseException ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    ex.getResponseBodyAsString()
            );
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,
                    "Failed to call Google token endpoint");
        }
    }
}
