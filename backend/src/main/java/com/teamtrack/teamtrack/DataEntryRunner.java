package com.teamtrack.teamtrack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.entities.AttendanceEntity;
import com.teamtrack.teamtrack.entities.AttendanceEntity.AttendanceStatus;
import com.teamtrack.teamtrack.entities.EmployeeEntity.Gender;
import com.teamtrack.teamtrack.entities.DepartmentEntity;
import com.teamtrack.teamtrack.entities.DesignationEntity;
import com.teamtrack.teamtrack.entities.LeaveEntity;
import com.teamtrack.teamtrack.entities.LeaveTypesEntity;
import com.teamtrack.teamtrack.services.AttendanceServices;
import com.teamtrack.teamtrack.services.DepartmentServices;
import com.teamtrack.teamtrack.services.DesignationServices;
import com.teamtrack.teamtrack.services.EmployeeServices;
import com.teamtrack.teamtrack.services.LeaveServices;
import com.teamtrack.teamtrack.services.LeaveTypesServices;
import com.teamtrack.teamtrack.entities.UserEntity;
import com.teamtrack.teamtrack.repositories.LeaveTypesRepository;
import com.teamtrack.teamtrack.repositories.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Component
public class DataEntryRunner implements CommandLineRunner {

    @Autowired
    private DepartmentServices departmentServices;

    @Autowired
    private DesignationServices designationServices;

    @Autowired
    private EmployeeServices employeeServices;

    @Autowired
    private LeaveTypesServices leaveTypesServices;

    @Autowired
    private AttendanceServices attendanceServices;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LeaveTypesRepository leaveTypesRepository;

    @Autowired
    private LeaveServices leaveServices;

    @Override
    public void run(String... args) throws Exception {
        if (departmentServices.getAllDepartments() == 0) {
            addDepartments();
        }

        if (designationServices.getAllDesignations() == 0) {
            addDesignations();
        }

        if (leaveTypesServices.getAllLeaveTypes() == 0) {
            addLeaveTypes();
        }

        if (employeeServices.getAllEmployees() == 0) {
            addEmployees();
        }

        if (attendanceServices.getAllAttendances() == 0) {
            userRepository.findAll().forEach(this::addAttendance);
        }

        if (leaveServices.getLeavesCount() == 0) {
            userRepository.findAll().forEach(this::addLeave);
        }
    }

    private void addDepartments() {
        DepartmentEntity department1 = new DepartmentEntity();
        department1.setDepartmentName("Software Development");
        departmentServices.addDepartment(department1);

        DepartmentEntity department2 = new DepartmentEntity();
        department2.setDepartmentName("Quality Assurance");
        departmentServices.addDepartment(department2);

        DepartmentEntity department3 = new DepartmentEntity();
        department3.setDepartmentName("Product Management");
        departmentServices.addDepartment(department3);

        DepartmentEntity department4 = new DepartmentEntity();
        department4.setDepartmentName("Customer Support");
        departmentServices.addDepartment(department4);
    }

    private void addDesignations() {
        DesignationEntity designation1 = new DesignationEntity();
        designation1.setDesignationName("Software Engineer");
        designationServices.addDesignation(designation1);

        DesignationEntity designation2 = new DesignationEntity();
        designation2.setDesignationName("QA Engineer");
        designationServices.addDesignation(designation2);

        DesignationEntity designation3 = new DesignationEntity();
        designation3.setDesignationName("Product Manager");
        designationServices.addDesignation(designation3);

        DesignationEntity designation4 = new DesignationEntity();
        designation4.setDesignationName("Support Specialist");
        designationServices.addDesignation(designation4);
    }

    private void addLeaveTypes() {
        LeaveTypesEntity medicalLeave = new LeaveTypesEntity();
        medicalLeave.setTypeName("Medical Leave");
        leaveTypesServices.leaveTypesAdd(medicalLeave);

        LeaveTypesEntity casualLeaves = new LeaveTypesEntity();
        casualLeaves.setTypeName("Casual Leave");
        leaveTypesServices.leaveTypesAdd(casualLeaves);

        LeaveTypesEntity maternityLeave = new LeaveTypesEntity();
        maternityLeave.setTypeName("Maternity Leave");
        leaveTypesServices.leaveTypesAdd(maternityLeave);
    }

    private void addEmployees() {
        addEmployee("Rautish", "Kumar", "admin@gmail.com", "Software Development",
                "Software Engineer", UserEntity.Role.ADMIN, "9877543210", Gender.MALE, "Patna, India");

        addEmployee("Raushan", "Sharma", "employee@gmail.com", "Software Development",
                "Software Engineer", UserEntity.Role.EMPLOYEE, "9876743210", Gender.MALE, "Patna, India");

        addEmployee("Aarav", "Sharma", "aarav@company.com", "Software Development",
                "Software Engineer", UserEntity.Role.EMPLOYEE, "9876500001", Gender.MALE, "Patna, India");

        addEmployee("Vivaan", "Patel", "vivaan@company.com", "Quality Assurance",
                "QA Engineer", UserEntity.Role.EMPLOYEE, "9876500002", Gender.MALE, "Mumbai, India");

        addEmployee("Aditya", "Rao", "aditya@company.com", "Product Management",
                "Product Manager", UserEntity.Role.EMPLOYEE, "9876500003", Gender.MALE, "Bangalore, India");

        addEmployee("Ayaan", "Nair", "ayaan@company.com", "Customer Support",
                "Support Specialist", UserEntity.Role.EMPLOYEE, "9876500004", Gender.MALE, "Chennai, India");

        addEmployee("Arjun", "Gupta", "arjun@company.com", "Software Development",
                "QA Engineer", UserEntity.Role.EMPLOYEE, "9876500005", Gender.MALE, "Patna, India");

        addEmployee("Vihaan", "Mehta", "vihaan@company.com", "Quality Assurance",
                "Product Manager", UserEntity.Role.EMPLOYEE, "9876500006", Gender.MALE, "Mumbai, India");

        addEmployee("Krishna", "Singh", "krishna@company.com", "Product Management",
                "Support Specialist", UserEntity.Role.EMPLOYEE, "9876500007", Gender.MALE, "Bangalore, India");

        addEmployee("Ishaan", "Yadav", "ishaan@company.com", "Customer Support",
                "Software Engineer", UserEntity.Role.EMPLOYEE, "9876500008", Gender.MALE, "Chennai, India");

        addEmployee("Arnav", "Joshi", "arnav@company.com", "Software Development",
                "QA Engineer", UserEntity.Role.EMPLOYEE, "9876500009", Gender.MALE, "Patna, India");

        addEmployee("Reyansh", "Kumar", "reyansh@company.com", "Quality Assurance",
                "Product Manager", UserEntity.Role.EMPLOYEE, "9876500010", Gender.MALE, "Mumbai, India");

        addEmployee("Ananya", "Verma", "ananya@company.com", "Quality Assurance",
                "Software Engineer", UserEntity.Role.EMPLOYEE, "9876500011", Gender.FEMALE, "Mumbai, India");

        addEmployee("Aadhya", "Kapoor", "aadhya@company.com", "Product Management",
                "QA Engineer", UserEntity.Role.EMPLOYEE, "9876500012", Gender.FEMALE, "Bangalore, India");

        addEmployee("Myra", "Bansal", "myra@company.com", "Customer Support",
                "Product Manager", UserEntity.Role.EMPLOYEE, "9876500013", Gender.FEMALE, "Chennai, India");

        addEmployee("Diya", "Jain", "diya@company.com", "Software Development",
                "Support Specialist", UserEntity.Role.EMPLOYEE, "9876500014", Gender.FEMALE, "Patna, India");

        addEmployee("Aarohi", "Reddy", "aarohi@company.com", "Quality Assurance",
                "QA Engineer", UserEntity.Role.EMPLOYEE, "9876500015", Gender.FEMALE, "Mumbai, India");

        addEmployee("Sara", "Shah", "sara@company.com", "Product Management",
                "Product Manager", UserEntity.Role.EMPLOYEE, "9876500016", Gender.FEMALE, "Bangalore, India");

        addEmployee("Riya", "Khanna", "riya@company.com", "Customer Support",
                "Software Engineer", UserEntity.Role.EMPLOYEE, "9876500017", Gender.FEMALE, "Chennai, India");

        addEmployee("Anika", "Chopra", "anika@company.com", "Software Development",
                "QA Engineer", UserEntity.Role.EMPLOYEE, "9876500018", Gender.FEMALE, "Patna, India");

        addEmployee("Navya", "Malhotra", "navya@company.com", "Quality Assurance",
                "Product Manager", UserEntity.Role.EMPLOYEE, "9876500019", Gender.FEMALE, "Mumbai, India");

        addEmployee("Kavya", "Bajaj", "kavya@company.com", "Product Management",
                "Support Specialist", UserEntity.Role.EMPLOYEE, "9876500020", Gender.FEMALE, "Bangalore, India");
    }

    private void addAttendance(UserEntity user) {
        Random random = new Random();
        LocalDate startDate = LocalDate.now().minusYears(1);
        LocalDate endDate = LocalDate.now();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            AttendanceEntity attendance = new AttendanceEntity();
            attendance.setDate(date);

            int status = random.nextInt(4);
            switch (status) {
                case 0:
                    attendance.setStatus(AttendanceStatus.Present);
                    break;
                case 1:
                    attendance.setStatus(AttendanceStatus.Absent);
                    break;
                case 2:
                    attendance.setStatus(AttendanceStatus.Late);
                    break;
                case 3:
                    attendance.setStatus(AttendanceStatus.OnLeave);
                    break;
            }
            attendance.setUser(user);
            attendanceServices.addAttendance(attendance);
        }
    }

    private void addLeave(UserEntity user) {
        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            LeaveEntity leave = new LeaveEntity();
            leave.setStartDate(LocalDate.now().plusDays(random.nextInt(30)));
            leave.setEndDate(leave.getStartDate().plusDays(random.nextInt(10)));
            leave.setDateApplied(LocalDate.now().minusDays(random.nextInt(10)));
            leave.setDescription("Leave " + (i + 1));
            leave.setUser(user);

            List<LeaveTypesEntity> leaveTypes = leaveTypesRepository.findAll();
            LeaveTypesEntity randomLeaveType = leaveTypes.get(random.nextInt(leaveTypes.size()));
            leave.setLeaveType(randomLeaveType);

            LeaveEntity.Status[] statuses = LeaveEntity.Status.values();
            LeaveEntity.Status randomStatus = statuses[random.nextInt(statuses.length)];
            leave.setStatus(randomStatus);

            leaveServices.autoAddLeave(leave);
        }
    }

    private void addEmployee(String firstName, String lastName, String email,
            String departmentName, String designationName,
            UserEntity.Role role, String phoneNumber, Gender gender, String address) {
        EmployeeDTO employee = new EmployeeDTO();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setPhoneNumber(phoneNumber);
        employee.setEmail(email);
        employee.setPassword("123");
        employee.setRole(role);
        employee.setGender(gender);
        employee.setHireDate(LocalDate.now());
        employee.setDateOfBirth(LocalDate.of(1990, 1, 1));

        DepartmentEntity department = departmentServices.findByName(departmentName);
        employee.setDepartmentId(department.getDepartmentId());

        DesignationEntity designation = designationServices.findByName(designationName);
        employee.setDesignationId(designation.getDesignationId());

        employee.setAddress(address);
        employeeServices.addEmployee(employee);
    }
}
