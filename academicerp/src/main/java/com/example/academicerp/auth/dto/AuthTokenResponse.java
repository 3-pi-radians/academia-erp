package com.example.academicerp.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AuthTokenResponse {
    @JsonProperty("access_token")
    private String access_token;

    @JsonProperty("expires_in")
    private String expires_in;

    @JsonProperty("refresh_token")
    private String refresh_token;

    @JsonProperty("scope")
    private String scope;

    @JsonProperty("token_type")
    private String token_type;

    @JsonProperty("id_token")
    private String idToken;
}
