package com.teamtrack.teamtrack.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.teamtrack.DTO.AdminDashboardDTO;
import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.DTO.LoginDTO;
import com.teamtrack.teamtrack.services.AdminServices;
import com.teamtrack.teamtrack.services.JwtServices;
import org.springframework.web.bind.annotation.GetMapping;

@RestController

@RequestMapping("admin")
public class AdminController {

    @Autowired
    AdminServices adminServices;
    @Autowired
    JwtServices jwtServices;

    @PostMapping("/employee/add")
    public ResponseEntity<String> addEmployee(@RequestBody EmployeeDTO entity) {

        return adminServices.addEmployee(entity);
    }

    @GetMapping("/employee/getall")
    public List<LoginDTO> getAllEmployees() {

        return adminServices.getAllEmployees();
    }

    @GetMapping("/dashboard")
    public AdminDashboardDTO getDashboardInformation() {
        return adminServices.getDashboardInformation();
    }

}
