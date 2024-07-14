package com.teamtrack.teamtrack.DTO;

import java.util.List;

import com.teamtrack.teamtrack.entities.AttendanceEntity;
import com.teamtrack.teamtrack.entities.DepartmentEntity;
import com.teamtrack.teamtrack.entities.DesignationEntity;
import com.teamtrack.teamtrack.entities.EmployeeEntity;
import com.teamtrack.teamtrack.entities.LeaveEntity;
import com.teamtrack.teamtrack.entities.EmployeeEntity.Gender;
import com.teamtrack.teamtrack.entities.UserEntity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class LoginDTO {

    private String userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private Role role;
    private Gender gender;
    private String address;
    private EmployeeEntity employeeDetails;
    private DepartmentEntity departmentDetails;
    private DesignationEntity designationDetails;
    private List<LeaveEntity> leaveDetails;
    private List<AttendanceEntity> attendanceDetails;
    

}
