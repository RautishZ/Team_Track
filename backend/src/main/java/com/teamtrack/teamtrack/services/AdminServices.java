package com.teamtrack.teamtrack.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.DTO.AdminDashboardDTO;
import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.DTO.LoginDTO;
import com.teamtrack.teamtrack.entities.EmployeeEntity;
import com.teamtrack.teamtrack.entities.UserEntity;
import com.teamtrack.teamtrack.entities.AttendanceEntity.AttendanceStatus;
import com.teamtrack.teamtrack.entities.LeaveEntity.Status;
import com.teamtrack.teamtrack.repositories.AttendanceRepository;
import com.teamtrack.teamtrack.repositories.DepartmentRepository;
import com.teamtrack.teamtrack.repositories.DesignationRepository;
import com.teamtrack.teamtrack.repositories.EmployeeRepository;
import com.teamtrack.teamtrack.repositories.LeaveRepository;
import com.teamtrack.teamtrack.repositories.UserRepository;

@Service
public class AdminServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtServices jwtServices;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    IdGeneraterServices idGeneraterServices;
    @Autowired
    DesignationRepository designationRepository;
    @Autowired
    DepartmentRepository departmentRepository;
    @Autowired
    LeaveRepository leaveRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    AttendanceRepository attendanceRepository;

    public ResponseEntity<String> addEmployee(EmployeeDTO request) {
        UserEntity userEntity = new UserEntity();

        String newId = idGeneraterServices.generateId("ET", "Employee");
        userEntity.setUserId(newId);
        userEntity.setFirstName(request.getFirstName());
        userEntity.setLastName(request.getLastName());
        userEntity.setEmail(request.getEmail());
        userEntity.setPhoneNumber(request.getPhoneNumber());
        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        userEntity.setRole(request.getRole());

        EmployeeEntity employeeEntity = new EmployeeEntity();
        employeeEntity.setEmployeeId(newId);
        employeeEntity.setHireDate(request.getHireDate());
        employeeEntity.setDateOfBirth(request.getDateOfBirth());
        employeeEntity.setDesignation(designationRepository.findById(request.getDesignationId()).orElse(null));
        employeeEntity.setDepartment(departmentRepository.findById(request.getDepartmentId()).orElse(null));
        employeeEntity.setAddress(request.getAddress());
        employeeEntity.setGender(request.getGender());
        employeeEntity.setFirstName(request.getFirstName());
        employeeEntity.setLastName(request.getLastName());
        userEntity = userRepository.save(userEntity);
        employeeEntity.setUser(userEntity);
        employeeRepository.save(employeeEntity);

        return new ResponseEntity<>("Employee added", HttpStatus.CREATED);
    }

    public List<LoginDTO> getAllEmployees() {

        return userRepository.findAll().stream().map(user -> {
            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setUserId(user.getUserId());
            loginDTO.setFirstName(user.getFirstName());
            loginDTO.setLastName(user.getLastName());
            loginDTO.setEmail(user.getEmail());
            loginDTO.setRole(user.getRole());
            loginDTO.setPhoneNumber(user.getPhoneNumber());

            // Checking for null before accessing properties
            if (user.getEmployee() != null) {
                loginDTO.setEmployeeDetails(user.getEmployee());
                loginDTO.setDepartmentDetails(user.getEmployee().getDepartment());
                loginDTO.setDesignationDetails(user.getEmployee().getDesignation());
            }

            // Assuming these are collections, ensure they are initialized before accessing
            if (user.getLeaves() != null) {
                loginDTO.setLeaveDetails(user.getLeaves());
            }
            if (user.getAttendances() != null) {
                loginDTO.setAttendanceDetails(user.getAttendances());
            }

            return loginDTO;
        }).collect(Collectors.toList());
    }

    public AdminDashboardDTO getDashboardInformation() {
        AdminDashboardDTO dashboardDTO = new AdminDashboardDTO();
        dashboardDTO.setTotalEmployees(userRepository.count());
        dashboardDTO.setTotalDepartments(departmentRepository.count());
        dashboardDTO.setTotalDesignations(designationRepository.count());
        dashboardDTO.setTotalPendingLeaves(leaveRepository.countByStatus(Status.Pending));
        dashboardDTO.setTotalApprovedLeaves(leaveRepository.countByStatus(Status.Approved));
        dashboardDTO.setTotalRejectedLeaves(leaveRepository.countByStatus(Status.Rejected));
        dashboardDTO.setTotalPresentToday(
                attendanceRepository.findAllByDate(LocalDate.now(ZoneId.of("Asia/Kolkata"))).stream()
                        .filter(attendance -> attendance.getStatus().equals(AttendanceStatus.Present)).count());
        dashboardDTO.setTotalAbsentToday(
                attendanceRepository.findAllByDate(LocalDate.now(ZoneId.of("Asia/Kolkata"))).stream()
                        .filter(attendance -> attendance.getStatus().equals(AttendanceStatus.Absent)).count());
        dashboardDTO.setTotalOnLeaveToday(
                attendanceRepository.findAllByDate(LocalDate.now(ZoneId.of("Asia/Kolkata"))).stream()
                        .filter(attendance -> attendance.getStatus().equals(AttendanceStatus.OnLeave)).count());
        dashboardDTO.setTotalLateToday(
                attendanceRepository.findAllByDate(LocalDate.now(ZoneId.of("Asia/Kolkata"))).stream()
                        .filter(attendance -> attendance.getStatus().equals(AttendanceStatus.Late)).count());
        return dashboardDTO;
    }

}
