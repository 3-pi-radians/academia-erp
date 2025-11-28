package com.example.academicerp.auth.dto;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class AuthCodeRequest {

    @JsonProperty("code")
    private String code;
}
