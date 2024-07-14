package com.teamtrack.teamtrack.DTO;

import com.teamtrack.teamtrack.entities.AttendanceEntity.AttendanceStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployeeDashboardDTO {

    private AttendanceStatus attendanceStatus;
    private int TotalTeamMembers;
    private Long leavesPending;
    private Long leavesApproved;
    private Long leavesRejected;
    private Long totalLateDays;
    private Long totalAbsentDays;
    private Long totalLeaveDays;
    private Long totalPresentDays;
    private Long totalDaysWork;

}
