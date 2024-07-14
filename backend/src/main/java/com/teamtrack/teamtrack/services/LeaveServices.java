package com.teamtrack.teamtrack.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.DTO.LeaveDTO;
import com.teamtrack.teamtrack.DTO.LeaveManageDTO;
import com.teamtrack.teamtrack.entities.LeaveEntity;
import com.teamtrack.teamtrack.entities.LeaveTypesEntity;
import com.teamtrack.teamtrack.entities.UserEntity;
import com.teamtrack.teamtrack.repositories.LeaveRepository;
import com.teamtrack.teamtrack.repositories.LeaveTypesRepository;
import com.teamtrack.teamtrack.repositories.UserRepository;

@Service
public class LeaveServices {

    @Autowired
    LeaveRepository leaveRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LeaveTypesRepository leaveTypesRepository;
    @Autowired
    IdGeneraterServices idGeneraterServices;

    public String addLeave(LeaveDTO leaveDTO) {
        UserEntity userEntity = userRepository.getReferenceById(leaveDTO.getUserId());
        LeaveEntity leaveEntity = new LeaveEntity();
        LeaveTypesEntity leaveTypesEntity = leaveTypesRepository.getReferenceById(leaveDTO.getTypeId());

        leaveEntity.setLeaveId(idGeneraterServices.generateId("LE", "Leave"));
        leaveEntity.setStartDate(leaveDTO.getStartDate());
        leaveEntity.setEndDate(leaveDTO.getEndDate());
        leaveEntity.setDescription(leaveDTO.getDescription());
        leaveEntity.setUser(userEntity);
        leaveEntity.setLeaveType(leaveTypesEntity);

        leaveRepository.save(leaveEntity);

        return leaveEntity.getLeaveId();
    }

    public List<LeaveEntity> getAllLeaves(String userId) {
        return leaveRepository.findAllByUserUserId(userId);
    }

    public String deleteLeave(String leaveId) {
        leaveRepository.deleteById(leaveId);
        return "Leave Deleted";
    }

    public String updateLeave(LeaveDTO leaveDTO) {
        LeaveEntity leaveEntity = leaveRepository.findById(leaveDTO.getLeaveId()).orElse(null);
        if (leaveEntity == null) {
            return "Leave not found";
        }

        UserEntity userEntity = userRepository.getReferenceById(leaveDTO.getUserId());
        LeaveTypesEntity leaveTypesEntity = leaveTypesRepository.getReferenceById(leaveDTO.getTypeId());

        leaveEntity.setStartDate(leaveDTO.getStartDate());
        leaveEntity.setEndDate(leaveDTO.getEndDate());
        leaveEntity.setDescription(leaveDTO.getDescription());
        leaveEntity.setUser(userEntity);
        leaveEntity.setLeaveType(leaveTypesEntity);

        leaveRepository.save(leaveEntity);

        return "Leave Updated";
    }

    public List<LeaveManageDTO> getAllLeaves() {
        return leaveRepository.findAll().stream().map(leaveEntity -> {
            LeaveManageDTO leaveManageDTO = new LeaveManageDTO();
            leaveManageDTO.setLeave(leaveEntity);
            UserEntity user = leaveEntity.getUser();
            if (user != null) {
                leaveManageDTO.setName(user.getFirstName() + " " + user.getLastName());

                // Assuming the Employee entity is correctly linked to UserEntity
                if (user.getEmployee() != null && user.getEmployee().getDesignation() != null) {
                    leaveManageDTO.setDesignation(user.getEmployee().getDesignation().getDesignationName());
                } else {
                    leaveManageDTO.setDesignation("N/A"); // or some default value
                }
            } else {
                leaveManageDTO.setName("N/A");
                leaveManageDTO.setDesignation("N/A");
            }

            return leaveManageDTO;
        }).collect(Collectors.toList());
    }

    public void autoAddLeave(LeaveEntity leave) {
        leave.setLeaveId(idGeneraterServices.generateId("LE", "Leave"));
        leaveRepository.save(leave);

    }

    public Long getLeavesCount() {
        return leaveRepository.count();
    }

}
