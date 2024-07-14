package com.teamtrack.teamtrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.teamtrack.entities.DesignationEntity;

public interface DesignationRepository extends JpaRepository<DesignationEntity, String> {

    DesignationEntity findByDesignationName(String designationName);

}
