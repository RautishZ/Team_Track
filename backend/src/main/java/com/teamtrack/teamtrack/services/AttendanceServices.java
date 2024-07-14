package com.teamtrack.teamtrack.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.DTO.LoginDTO;
import com.teamtrack.teamtrack.entities.AttendanceEntity;
import com.teamtrack.teamtrack.entities.UserEntity;
import com.teamtrack.teamtrack.entities.AttendanceEntity.AttendanceStatus;
import com.teamtrack.teamtrack.repositories.AttendanceRepository;
import com.teamtrack.teamtrack.repositories.UserRepository;

@Service
public class AttendanceServices {

    @Autowired
    AttendanceRepository attendanceRepository;

    @Autowired
    UserRepository userRepository;

    public void addAttendance(AttendanceEntity entity) {
        attendanceRepository.save(entity);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    public List<LoginDTO> getAllAttendanceByDate(LocalDate attendanceDate) {
        return userRepository.findAll().stream().map((user) -> {
            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setEmail(user.getEmail());
            loginDTO.setPhoneNumber(user.getPhoneNumber());
            loginDTO.setUserId(user.getUserId());
            loginDTO.setRole(user.getRole());
            loginDTO.setEmployeeDetails(user.getEmployee());
            loginDTO.setDepartmentDetails(user.getEmployee().getDepartment());
            loginDTO.setDesignationDetails(user.getEmployee().getDesignation());
            loginDTO.setAttendanceDetails(
                    user.getAttendances().stream()
                            .filter(attendance -> attendance.getDate().equals(attendanceDate))
                            .collect(Collectors.toList()));
            return loginDTO;
        }).collect(Collectors.toList());
    }

    public String updateAttendanceStatus(EmployeeDTO employeeDTO) {

        String userId = employeeDTO.getUserId();
        AttendanceStatus newStatus = employeeDTO.getAttendanceStatus();
        LocalDate attendanceDate = employeeDTO.getAttendanceDate();

        Optional<UserEntity> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            List<AttendanceEntity> attendances = user.getAttendances();

            AttendanceEntity attendance = attendances.stream()
                    .filter(att -> att.getDate().equals(attendanceDate))
                    .findFirst()
                    .orElseGet(() -> {
                        AttendanceEntity newAttendance = new AttendanceEntity();
                        newAttendance.setDate(attendanceDate);
                        newAttendance.setUser(user);
                        attendances.add(newAttendance);
                        return newAttendance;
                    });

            attendance.setStatus(newStatus);
            attendanceRepository.save(attendance);
            return "Attendance status updated successfully";
        }

        return "User not found";
    }

    public Long getAllAttendances() {
        return attendanceRepository.count();
    }

}
