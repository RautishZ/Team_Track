package com.teamtrack.teamtrack.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "Designation")
public class DesignationEntity {
    @Id
    private String designationId;
    private String designationName;
    @JsonIgnore
    @OneToMany(mappedBy = "designation")
    private Set<EmployeeEntity> employees;

}
