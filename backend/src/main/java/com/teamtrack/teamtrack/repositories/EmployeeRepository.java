package com.teamtrack.teamtrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.teamtrack.entities.EmployeeEntity;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, String> {

}
