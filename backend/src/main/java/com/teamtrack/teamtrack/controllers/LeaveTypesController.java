package com.teamtrack.teamtrack.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.teamtrack.entities.LeaveTypesEntity;
import com.teamtrack.teamtrack.repositories.LeaveTypesRepository;
import com.teamtrack.teamtrack.services.IdGeneraterServices;
import com.teamtrack.teamtrack.services.LeaveTypesServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class LeaveTypesController {

    @Autowired
    LeaveTypesRepository leaveTypesRepository;
    @Autowired
    IdGeneraterServices idGeneraterServices;

    @Autowired
    LeaveTypesServices leaveTypesServices;

    @PostMapping("admin/leavetypes/add")
    public ResponseEntity<String> leaveTypesAdd(@RequestBody LeaveTypesEntity entity) {
        return leaveTypesServices.leaveTypesAdd(entity);

    }

    @GetMapping("leavetypes/getall")
    public List<LeaveTypesEntity> getAllLeavesTypes() {

        return leaveTypesServices.getAllLeavesTypes();

    }

}
