package com.teamtrack.teamtrack.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AdminDashboardDTO {
    private Long totalEmployees;
    private Long totalDepartments;
    private Long totalDesignations;
    private Long totalPresentToday;
    private Long totalAbsentToday;
    private Long totalOnLeaveToday;
    private Long totalLateToday;
    private Long totalPendingLeaves;
    private Long totalApprovedLeaves;
    private Long totalRejectedLeaves;

}
