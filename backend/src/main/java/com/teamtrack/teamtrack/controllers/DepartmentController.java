package com.teamtrack.teamtrack.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.DTO.LoginDTO;
import com.teamtrack.teamtrack.entities.DepartmentEntity;
import com.teamtrack.teamtrack.services.DepartmentServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class DepartmentController {

    @Autowired
    DepartmentServices departmentServices;

    @PostMapping("admin/department/add")
    public String addDepartment(@RequestBody DepartmentEntity departmentDetails) {
        return departmentServices.addDepartment(departmentDetails);

    }

    @GetMapping("admin/department/getall")
    public List<DepartmentEntity> getAllDepartment() {
        return departmentServices.getAllDepartment();
    }

    @GetMapping("department/allusers/{departmentId}")
    public List<EmployeeDTO> getAllUsers(@PathVariable String departmentId) {
        return departmentServices.getAllUsers(departmentId);
    }

    @PutMapping("/admin/department/update/{departmentHeadId}")
    public String updateDepartment(@PathVariable String departmentHeadId,
            @RequestBody DepartmentEntity departmentDetails) {
        return departmentServices.updateDepartment(departmentHeadId, departmentDetails);
    }

    @GetMapping("/departmentHead/{departmentId}")
    public LoginDTO getDepartmentHead(@PathVariable String departmentId) {
        return departmentServices.getDepartmentHead(departmentId);
    }
}
