package com.teamtrack.teamtrack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.entities.LeaveTypesEntity;
import com.teamtrack.teamtrack.repositories.LeaveTypesRepository;

@Service
public class LeaveTypesServices {

    @Autowired
    IdGeneraterServices idGeneraterServices;

    @Autowired
    LeaveTypesRepository leaveTypesRepository;

    public ResponseEntity<String> leaveTypesAdd(LeaveTypesEntity entity) {
        entity.setTypeId(idGeneraterServices.generateId("LT", "LeaveTypes"));
        leaveTypesRepository.save(entity);
        return new ResponseEntity<>("Leave Type Added", HttpStatus.CREATED);
    }

    public List<LeaveTypesEntity> getAllLeavesTypes() {

        return leaveTypesRepository.findAll();
    }

    public Long getAllLeaveTypes() {
        return leaveTypesRepository.count();
    }

}
