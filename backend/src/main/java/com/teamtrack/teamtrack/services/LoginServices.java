package com.teamtrack.teamtrack.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.DTO.LoginDTO;
import com.teamtrack.teamtrack.entities.UserEntity;
import com.teamtrack.teamtrack.repositories.EmployeeRepository;
import com.teamtrack.teamtrack.repositories.UserRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class LoginServices {

    @Autowired
    JwtServices jwtServices;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EmployeeRepository employeeRepository;

    public LoginDTO LoginDetails(HttpServletRequest request) {
        LoginDTO loginDTO = new LoginDTO();
        String userId = jwtServices.extractUserId(request);
        if (userId != null) {
            UserEntity user = userRepository.findById(userId).get();
            loginDTO.setUserId(userId);
            loginDTO.setFirstName(user.getFirstName());
            loginDTO.setLastName(user.getLastName());
            loginDTO.setEmail(user.getEmail());
            loginDTO.setRole(user.getRole());
            loginDTO.setPhoneNumber(user.getPhoneNumber());
            loginDTO.setEmployeeDetails(user.getEmployee());
            loginDTO.setAddress(user.getEmployee().getAddress());
            loginDTO.setGender(user.getEmployee().getGender());
            loginDTO.setDepartmentDetails(user.getEmployee().getDepartment());
            loginDTO.setDesignationDetails(user.getEmployee().getDesignation());
            loginDTO.setLeaveDetails(user.getLeaves());
            loginDTO.setAttendanceDetails(user.getAttendances());

            return loginDTO;
        }

        return loginDTO;
    }

}
