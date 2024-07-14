package com.teamtrack.teamtrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.teamtrack.entities.LeaveTypesEntity;

public interface LeaveTypesRepository extends JpaRepository<LeaveTypesEntity, String> {

}