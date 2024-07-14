package com.teamtrack.teamtrack.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.DTO.LoginDTO;
import com.teamtrack.teamtrack.services.AttendanceServices;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController

public class AttendanceController {

    @Autowired
    AttendanceServices attendanceServices;

    @GetMapping("admin/attendance/{attendanceDate}")
    public List<LoginDTO> getAllAttendanceByDate(
            @PathVariable LocalDate attendanceDate) {

        System.out.println("Attendance Date: " + attendanceDate);

        return attendanceServices.getAllAttendanceByDate(attendanceDate);
    }

    @PutMapping("/admin/attendance/status/update")
    public String updateAttendanceStatus(@RequestBody EmployeeDTO loginDTO) {

        return attendanceServices.updateAttendanceStatus(loginDTO);
    }

}
