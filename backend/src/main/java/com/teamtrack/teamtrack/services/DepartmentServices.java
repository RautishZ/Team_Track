package com.teamtrack.teamtrack.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.DTO.LoginDTO;
import com.teamtrack.teamtrack.entities.DepartmentEntity;
import com.teamtrack.teamtrack.entities.UserEntity;
import com.teamtrack.teamtrack.repositories.DepartmentRepository;
import com.teamtrack.teamtrack.repositories.EmployeeRepository;
import com.teamtrack.teamtrack.repositories.UserRepository;

@Service
public class DepartmentServices {

    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    IdGeneraterServices idGeneraterServices;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    UserRepository userRepository;

    public String addDepartment(DepartmentEntity departmentDetails) {

        departmentDetails.setDepartmentId(idGeneraterServices.generateId("DT", "Department"));
        departmentDetails.setDepartmentName(departmentDetails.getDepartmentName().trim());

        departmentRepository.save(departmentDetails);
        return departmentDetails.getDepartmentId();
    }

    public List<DepartmentEntity> getAllDepartment() {

        return departmentRepository.findAll();

    }

    public List<EmployeeDTO> getAllUsers(String departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new NoSuchElementException("Department not found"))
                .getEmployees()
                .stream()
                .map(employee -> {
                    EmployeeDTO user = new EmployeeDTO();
                    user.setUserId(employee.getUser().getUserId());
                    user.setFirstName(employee.getUser().getFirstName());
                    user.setLastName(employee.getUser().getLastName());
                    user.setEmail(employee.getUser().getEmail());
                    user.setPhoneNumber(employee.getUser().getPhoneNumber());
                    user.setGender(employee.getGender());
                    user.setDesignationName(employee.getDesignation().getDesignationName());
                    user.setDateOfBirth(employee.getDateOfBirth());
                    user.setAddress(employee.getAddress());
                    user.setHireDate(employee.getHireDate());
                    return user;
                }).collect(Collectors.toList());
    }

    public String updateDepartment(String departmentHeadId, DepartmentEntity departmentDetails) {
        DepartmentEntity department = departmentRepository.findById(departmentDetails.getDepartmentId())
                .orElseThrow(() -> new NoSuchElementException("Department not found"));

        department.setDepartmentName(departmentDetails.getDepartmentName());
        if (departmentHeadId != null) {

            department.setEmployee(employeeRepository.findById(departmentHeadId).get());
        }
        departmentRepository.save(department);
        return department.getDepartmentId();
    }

    public LoginDTO getDepartmentHead(String departmentId) {
        UserEntity user = userRepository.findById(departmentId).get();
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUserId(user.getUserId());
        loginDTO.setFirstName(user.getFirstName());
        loginDTO.setLastName(user.getLastName());
        loginDTO.setEmail(user.getEmail());
        loginDTO.setPhoneNumber(user.getPhoneNumber());
        loginDTO.setRole(user.getRole());
        loginDTO.setEmployeeDetails(user.getEmployee());
        loginDTO.setDepartmentDetails(user.getEmployee().getDepartment());
        loginDTO.setDesignationDetails(user.getEmployee().getDesignation());
        return loginDTO;
    }

    public Long getAllDepartments() {
        return departmentRepository.count();

    }

    public DepartmentEntity findByName(String departmentName) {
        return departmentRepository.findByDepartmentName(departmentName);
    }

}
