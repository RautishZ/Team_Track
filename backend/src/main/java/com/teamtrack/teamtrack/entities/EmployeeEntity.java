package com.teamtrack.teamtrack.entities;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "Employees")
public class EmployeeEntity {

    @Id
    private String employeeId;
    private String firstName;
    private String lastName;
    private String address;
    private LocalDate dateOfBirth;
    @CreationTimestamp
    private LocalDate hireDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    public enum Gender {
        MALE,
        FEMALE,
        OTHER
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "departmentId")
    private DepartmentEntity department;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "designationId")
    private DesignationEntity designation;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "userId")
    private UserEntity user;

}