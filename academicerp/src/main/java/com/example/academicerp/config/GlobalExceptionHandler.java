package com.example.academicerp.config;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<Map<String, String>> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(this::toSimpleError)
                .collect(Collectors.toList());
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Please correct the highlighted fields and try again.");
        body.put("errors", errors);
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolation(ConstraintViolationException ex) {
        List<Map<String, String>> errors = ex.getConstraintViolations().stream()
                .map(this::toSimpleError)
                .collect(Collectors.toList());
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Some inputs are not valid. Please review and try again.");
        body.put("errors", errors);
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrity(DataIntegrityViolationException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("message", "We couldn't save your changes due to data rules. Please review the inputs and try again.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneric(Exception ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Something went wrong. Please try again or come back later.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

    private Map<String, String> toSimpleError(FieldError fe) {
        Map<String, String> m = new HashMap<>();
        m.put("field", fe.getField());
        m.put("message", fe.getDefaultMessage());
        return m;
    }

    private Map<String, String> toSimpleError(ConstraintViolation<?> cv) {
        Map<String, String> m = new HashMap<>();
        m.put("field", cv.getPropertyPath() != null ? cv.getPropertyPath().toString() : "");
        m.put("message", cv.getMessage());
        return m;
    }
}
