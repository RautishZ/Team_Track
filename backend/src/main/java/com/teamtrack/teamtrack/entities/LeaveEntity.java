package com.teamtrack.teamtrack.entities;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "Leaves")
public class LeaveEntity {
    @Id
    private String leaveId;
    private LocalDate startDate;
    private LocalDate endDate;
    @CreationTimestamp
    private LocalDate dateApplied;
    private String description;
    private Status status = Status.Pending;

    public enum Status {
        Pending,
        Approved,
        Rejected
    }

    @ManyToOne
    @JoinColumn(name = "typeId")
    private LeaveTypesEntity leaveType;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private UserEntity user;
}
