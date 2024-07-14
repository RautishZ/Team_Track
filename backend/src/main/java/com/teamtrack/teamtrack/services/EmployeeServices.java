package com.teamtrack.teamtrack.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.DTO.EmployeeDashboardDTO;
import com.teamtrack.teamtrack.entities.AttendanceEntity;
import com.teamtrack.teamtrack.entities.DepartmentEntity;
import com.teamtrack.teamtrack.entities.DesignationEntity;
import com.teamtrack.teamtrack.entities.EmployeeEntity;
import com.teamtrack.teamtrack.entities.UserEntity;
import com.teamtrack.teamtrack.entities.AttendanceEntity.AttendanceStatus;
import com.teamtrack.teamtrack.entities.LeaveEntity.Status;
import com.teamtrack.teamtrack.repositories.DepartmentRepository;
import com.teamtrack.teamtrack.repositories.DesignationRepository;
import com.teamtrack.teamtrack.repositories.EmployeeRepository;
import com.teamtrack.teamtrack.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class EmployeeServices {

        @Autowired
        private UserRepository userRepository;
        @Autowired
        private EmployeeRepository employeeRepository;
        @Autowired
        private DesignationRepository designationRepository;
        @Autowired
        private DepartmentRepository departmentRepository;
        @Autowired
        private IdGeneraterServices idGeneraterServices;
        @Autowired
        private PasswordEncoder passwordEncoder; // Autowire the PasswordEncoder

        public void addEmployee(EmployeeDTO employeeDTO) {
                UserEntity userEntity = new UserEntity();
                String newId = idGeneraterServices.generateId("ET", "Employee");
                userEntity.setUserId(newId);
                userEntity.setFirstName(employeeDTO.getFirstName());
                userEntity.setLastName(employeeDTO.getLastName());
                userEntity.setPhoneNumber(employeeDTO.getPhoneNumber());
                userEntity.setEmail(employeeDTO.getEmail());
                userEntity.setPassword(passwordEncoder.encode(employeeDTO.getPassword())); // Encode the password
                userEntity.setRole(employeeDTO.getRole());

                userRepository.save(userEntity);

                EmployeeEntity employeeEntity = new EmployeeEntity();
                employeeEntity.setFirstName(employeeDTO.getFirstName());
                employeeEntity.setLastName(employeeDTO.getLastName());
                employeeEntity.setEmployeeId(newId);
                employeeEntity.setHireDate(employeeDTO.getHireDate());
                employeeEntity.setDateOfBirth(employeeDTO.getDateOfBirth());
                employeeEntity.setAddress(employeeDTO.getAddress());
                employeeEntity.setGender(employeeDTO.getGender());
                employeeEntity.setUser(userEntity);

                DepartmentEntity departmentEntity = departmentRepository.findById(employeeDTO.getDepartmentId())
                                .orElse(null);
                DesignationEntity designationEntity = designationRepository.findById(employeeDTO.getDesignationId())
                                .orElse(null);

                employeeEntity.setDepartment(departmentEntity);
                employeeEntity.setDesignation(designationEntity);

                employeeRepository.save(employeeEntity);
        }

        public List<EmployeeEntity> getAllEmployeesToShow() {
                return employeeRepository.findAll();
        }

        public String updateEmployee(EmployeeDTO employeeDetails) {
                try {

                        UserEntity user = userRepository.findById(employeeDetails.getUserId())
                                        .orElseThrow(() -> new EntityNotFoundException("User not found"));
                        user.setFirstName(employeeDetails.getFirstName());
                        user.setLastName(employeeDetails.getLastName());
                        user.setPhoneNumber(employeeDetails.getPhoneNumber());
                        user.setEmail(employeeDetails.getEmail());
                        user.setRole(employeeDetails.getRole());

                        EmployeeEntity employee = employeeRepository.findById(employeeDetails.getUserId())
                                        .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
                        employee.setFirstName(employeeDetails.getFirstName());
                        employee.setLastName(employeeDetails.getLastName());
                        employee.setHireDate(employeeDetails.getHireDate());
                        employee.setDateOfBirth(employeeDetails.getDateOfBirth());
                        employee.setGender(employeeDetails.getGender());
                        employee.setAddress(employeeDetails.getAddress());

                        // Retrieve department and designation
                        DepartmentEntity department = departmentRepository.findById(employeeDetails.getDepartmentId())
                                        .orElseThrow(() -> new EntityNotFoundException("Department not found"));
                        DesignationEntity designation = designationRepository
                                        .findById(employeeDetails.getDesignationId())
                                        .orElseThrow(() -> new EntityNotFoundException("Designation not found"));

                        // Update relationships
                        employee.setDepartment(department);
                        employee.setDesignation(designation);

                        // Save changes
                        userRepository.save(user);
                        employeeRepository.save(employee);

                        return "Employee Updated";

                } catch (EntityNotFoundException ex) {
                        // Handle exception (e.g., log it, throw custom exception, etc.)
                        return "Employee update failed: " + ex.getMessage();
                }
        }

        public EmployeeDashboardDTO getDashboardInformation(String userId) {
                EmployeeDashboardDTO dashboard = new EmployeeDashboardDTO();
                Optional<UserEntity> userOpt = userRepository.findById(userId);

                if (userOpt.isPresent()) {
                        UserEntity user = userOpt.get();

                        // Set total team members
                        int totalTeamMembers = user.getEmployee().getDepartment().getEmployees().size();
                        dashboard.setTotalTeamMembers(totalTeamMembers);

                        dashboard.setLeavesApproved(
                                        user.getLeaves().stream()
                                                        .filter(leave -> leave.getStatus().equals(Status.Approved))
                                                        .count());
                        dashboard.setLeavesPending(
                                        user.getLeaves().stream()
                                                        .filter(leave -> leave.getStatus().equals(Status.Pending))
                                                        .count());
                        dashboard.setLeavesRejected(
                                        user.getLeaves().stream()
                                                        .filter(leave -> leave.getStatus().equals(Status.Rejected))
                                                        .count());
                        dashboard.setTotalAbsentDays(
                                        user.getAttendances().stream()
                                                        .filter(attendance -> attendance.getStatus()
                                                                        .equals(AttendanceStatus.Absent))
                                                        .count());
                        dashboard.setTotalPresentDays(
                                        user.getAttendances().stream()
                                                        .filter(attendance -> attendance.getStatus()
                                                                        .equals(AttendanceStatus.Present))
                                                        .count());
                        dashboard.setTotalLateDays(
                                        user.getAttendances().stream()
                                                        .filter(attendance -> attendance.getStatus()
                                                                        .equals(AttendanceStatus.Late))
                                                        .count());
                        dashboard.setTotalLeaveDays(
                                        user.getAttendances().stream()
                                                        .filter(attendance -> attendance.getStatus()
                                                                        .equals(AttendanceStatus.OnLeave))
                                                        .count());

                        // Set attendance status for the current date in the Indian time zone
                        LocalDate indianTodayDate = LocalDate.now(ZoneId.of("Asia/Kolkata"));
                        Optional<AttendanceEntity> attendanceOpt = user.getAttendances().stream()
                                        .filter(attendance -> attendance.getDate().equals(indianTodayDate))
                                        .findFirst();

                        if (attendanceOpt.isPresent()) {
                                dashboard.setAttendanceStatus(attendanceOpt.get().getStatus());
                        } else {
                                dashboard.setAttendanceStatus(null);
                        }
                } else {

                }

                return dashboard;
        }

        public Long getAllEmployees() {
                return employeeRepository.count();
        }

}
