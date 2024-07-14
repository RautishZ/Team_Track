package com.teamtrack.teamtrack.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.DTO.EmployeeDashboardDTO;
import com.teamtrack.teamtrack.DTO.LoginDTO;
import com.teamtrack.teamtrack.services.EmployeeServices;
import com.teamtrack.teamtrack.services.LoginServices;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;
    private LoginServices loginServices;

    @GetMapping("/getalldetails")
    public LoginDTO LoginDetails(HttpServletRequest request) {
        return loginServices.LoginDetails(request);

    }

    @PutMapping("/admin/employee/update")
    public String updateEmployee(@RequestBody EmployeeDTO employeeDetails) {
        return employeeServices.updateEmployee(employeeDetails);

    }

    @GetMapping("/employee/dashboard/{userId}")
    public EmployeeDashboardDTO getDashboardInformation(@PathVariable String userId) {
        return employeeServices.getDashboardInformation(userId);

    }

}