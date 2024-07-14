package com.teamtrack.teamtrack.entities;

import java.util.List;

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
@Table(name = "LeaveTypes")
public class LeaveTypesEntity {
    @Id
    private String typeId;
    private String typeName;

    @JsonIgnore
    @OneToMany(mappedBy = "leaveType")
    private List<LeaveEntity> leves;

}
