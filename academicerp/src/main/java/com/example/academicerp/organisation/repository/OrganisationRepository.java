package com.example.academicerp.organisation.repository;

import com.example.academicerp.organisation.entity.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganisationRepository extends JpaRepository<Organisation, Long> {
}
