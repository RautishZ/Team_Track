package com.teamtrack.teamtrack.DTO;

import java.time.LocalDate;

import com.teamtrack.teamtrack.entities.AttendanceEntity.AttendanceStatus;
import com.teamtrack.teamtrack.entities.EmployeeEntity.Gender;
import com.teamtrack.teamtrack.entities.UserEntity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class EmployeeDTO {

    private String userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String password;
    private String address;
    private Gender gender;
    public Role role;
    private LocalDate dateOfBirth;
    private LocalDate hireDate;
    private String departmentId;
    private String designationId;
    private String designationName;
    private AttendanceStatus attendanceStatus;
    private LocalDate attendanceDate;

}
