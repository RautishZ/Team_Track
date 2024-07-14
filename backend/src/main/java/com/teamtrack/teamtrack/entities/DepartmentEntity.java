package com.teamtrack.teamtrack.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Departments")
public class DepartmentEntity {
    @Id
    private String departmentId;
    private String departmentName;

    @OneToOne

    @JoinColumn(name = "departmentHead")
    private EmployeeEntity employee;
    @JsonIgnore
    @OneToMany(mappedBy = "department")
    private Set<EmployeeEntity> employees;

}
