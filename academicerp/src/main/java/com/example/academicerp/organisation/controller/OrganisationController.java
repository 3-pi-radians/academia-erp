package com.example.academicerp.organisation.controller;

import com.example.academicerp.organisation.entity.Organisation;
import com.example.academicerp.organisation.repository.OrganisationRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Valid;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/organisations", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Organisation", description = "APIs for managing organisations")
public class OrganisationController {

    private final OrganisationRepository organisationRepository;

    public OrganisationController(OrganisationRepository organisationRepository) {
        this.organisationRepository = organisationRepository;
    }

    @GetMapping
    @Operation(summary = "Get all organisations", description = "Retrieves a list of all organisations")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list of organisations")
    public List<Organisation> getAll() {
        return organisationRepository.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get organisation by ID", description = "Retrieves an organisation by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved organisation"),
        @ApiResponse(responseCode = "404", description = "Organisation not found", content = @Content)
    })
    public Organisation getById(
            @Parameter(description = "ID of the organisation to be retrieved", required = true)
            @PathVariable("id") Long id) {
        return organisationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Organisation not found"));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a new organisation", description = "Creates a new organisation with the provided details")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Organisation created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
    })
    public ResponseEntity<Organisation> create(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Organisation object that needs to be added",
                required = true,
                content = @Content(schema = @Schema(implementation = Organisation.class))
            )
            @Valid @RequestBody Organisation organisation) {
        if (organisation.getHrContacts() != null) {
            organisation.getHrContacts().forEach(hr -> hr.setOrganisation(organisation));
        }
        Organisation saved = organisationRepository.save(organisation);
        return ResponseEntity.created(URI.create("/api/organisations/" + saved.getId())).body(saved);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update an organisation", description = "Updates an existing organisation with the provided details")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Organisation updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content),
        @ApiResponse(responseCode = "404", description = "Organisation not found", content = @Content)
    })
    public Organisation update(
            @Parameter(description = "ID of the organisation to be updated", required = true)
            @PathVariable("id") Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Updated organisation object",
                required = true,
                content = @Content(schema = @Schema(implementation = Organisation.class))
            )
            @Valid @RequestBody Organisation updated) {
        return organisationRepository.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setAddress(updated.getAddress());
                    // Re-associate HR contacts with the existing organisation
                    existing.getHrContacts().clear();
                    if (updated.getHrContacts() != null) {
                        updated.getHrContacts().forEach(hr -> {
                            hr.setOrganisation(existing);
                            existing.getHrContacts().add(hr);
                        });
                    }
                    return organisationRepository.save(existing);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Organisation not found"));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete an organisation", description = "Deletes an organisation by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Organisation deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Organisation not found", content = @Content)
    })
    public void delete(
            @Parameter(description = "ID of the organisation to be deleted", required = true)
            @PathVariable("id") Long id) {
        Organisation org = organisationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Organisation not found"));
        // Deleting the managed entity ensures JPA cascades orphanRemoval/REMOVE to hrContacts
        organisationRepository.delete(org);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete all organisations", description = "Deletes all organisations (use with caution)")
    @ApiResponse(responseCode = "204", description = "All organisations deleted successfully")
    public void deleteAll() {
        // Load entities to ensure JPA cascades deletions to hrContacts
        List<Organisation> all = organisationRepository.findAll();
        all.forEach(organisationRepository::delete);
    }
}
