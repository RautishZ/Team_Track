package com.teamtrack.teamtrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.teamtrack.entities.DepartmentEntity;

public interface DepartmentRepository extends JpaRepository<DepartmentEntity, String> {

    DepartmentEntity findByDepartmentName(String departmentName);

}