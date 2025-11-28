package com.example.academicerp.organisation.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "organisation_hr")
@Schema(description = "Represents an HR contact person for an organisation")
public class OrganisationHr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The unique identifier of the HR contact", example = "1")
    private Long id;

    @Column(name = "first_name", nullable = false)
    @NotBlank(message = "First name is required")
    @Size(max = 25, message = "First name must not exceed 25 characters")
    @Schema(description = "The first name of the HR contact", example = "John", required = true)
    private String firstName;

    @Column(name = "last_name")
    @Size(max = 25, message = "Last name must not exceed 25 characters")
    @Schema(description = "The last name of the HR contact", example = "Doe")
    private String lastName;

    @Column(nullable = false)
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 50, message = "Email must not exceed 50 characters")
    @Schema(description = "The professional email address of the HR contact", 
             example = "john.doe@example.com", 
             required = true,
             format = "email")
    private String email;

    @Column(name = "contact_number", nullable = false)
    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Contact number must be a 10-digit number")
    @Schema(description = "The contact number of the HR contact (10 digits only)", 
             example = "9876543210", 
             required = true,
             pattern = "^\\d{10}$")
    private String contactNumber;

    @Column(name = "designation")
    @Schema(description = "The job designation of the HR contact", example = "HR Manager")
    private String designation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organisation_id", nullable = false)
    @JsonBackReference
    @Schema(description = "The organisation this HR contact belongs to")
    private Organisation organisation;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @Schema(description = "The timestamp when the HR contact was created", 
             example = "2023-01-01T12:00:00")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    @Schema(description = "The timestamp when the HR contact was last updated", 
             example = "2023-01-01T12:00:00")
    private LocalDateTime updatedAt;

    public OrganisationHr() {
    }

    public OrganisationHr(String firstName, String lastName, String email, String contactNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contactNumber = contactNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
