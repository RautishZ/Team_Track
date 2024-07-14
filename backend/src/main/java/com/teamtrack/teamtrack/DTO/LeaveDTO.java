package com.teamtrack.teamtrack.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveDTO {
    private String leaveId;
    private String userId;
    private String typeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;

}
