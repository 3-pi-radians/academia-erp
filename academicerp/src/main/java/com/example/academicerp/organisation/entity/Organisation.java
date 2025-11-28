package com.example.academicerp.organisation.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

@Entity
@Table(name = "organisations")
@Schema(description = "Represents an organisation in the system")
public class Organisation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The unique identifier of the organisation", example = "1")
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Name is required")
    @Size(max = 50, message = "Name must not exceed 50 characters")
    @Schema(description = "The name of the organisation", example = "Acme Corporation", required = true)
    private String name;

    @Column
    @Size(max = 100, message = "Address must not exceed 100 characters")
    @Schema(description = "The physical address of the organisation", example = "123 Business St, Tech Park", required = false)
    private String address;

    @Column
    @Schema(description = "The city where the organisation is located", example = "San Francisco")
    private String city;

    @Column
    @Schema(description = "The state or region where the organisation is located", example = "California")
    private String state;

    @Column
    @Schema(description = "The country where the organisation is located", example = "United States")
    private String country;

    @Column
    @Schema(description = "Postal or ZIP code of the organisation's location", example = "94105")
    private String pincode;

    @Column
    @Schema(description = "The official website URL of the organisation", example = "https://www.acme-corp.com")
    private String website;

    @Column(name = "industry_type")
    @Schema(description = "The industry sector of the organisation", example = "Technology")
    private String industryType;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @Schema(description = "The timestamp when the organisation was created", example = "2023-01-01T12:00:00")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    @Schema(description = "The timestamp when the organisation was last updated", example = "2023-01-01T12:00:00")
    private LocalDateTime updatedAt;

    @Column(name = "is_active")
    @Schema(description = "Indicates if the organisation is currently active", example = "true")
    private Boolean isActive = true;

    @OneToMany(mappedBy = "organisation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @Valid
    @Schema(description = "List of HR contacts associated with the organisation")
    private List<OrganisationHr> hrContacts = new ArrayList<>();

    public Organisation() {
    }

    public Organisation(String name, String address) {
        this.name = name;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getIndustryType() {
        return industryType;
    }

    public void setIndustryType(String industryType) {
        this.industryType = industryType;
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

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public List<OrganisationHr> getHrContacts() {
        return hrContacts;
    }

    public void setHrContacts(List<OrganisationHr> hrContacts) {
        this.hrContacts = hrContacts;
    }

    public void addHrContact(OrganisationHr hr) {
        hr.setOrganisation(this);
        this.hrContacts.add(hr);
    }

    public void removeHrContact(OrganisationHr hr) {
        hr.setOrganisation(null);
        this.hrContacts.remove(hr);
    }
}
