package com.teamtrack.teamtrack.DTO;

import com.teamtrack.teamtrack.entities.LeaveEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LeaveManageDTO {
    LeaveEntity leave;
    private String name;
    private String designation;

}
