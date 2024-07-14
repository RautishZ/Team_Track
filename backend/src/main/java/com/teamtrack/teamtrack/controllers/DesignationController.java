package com.teamtrack.teamtrack.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.teamtrack.entities.DesignationEntity;
import com.teamtrack.teamtrack.repositories.DesignationRepository;
import com.teamtrack.teamtrack.services.DesignationServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController

public class DesignationController {

    @Autowired
    DesignationServices designationServices;
    @Autowired
    DesignationRepository designationRepository;

    @PostMapping("/admin/designation/add")
    public void addDesignation(@RequestBody DesignationEntity designationDetails) {
        designationServices.addDesignation(designationDetails);
    }

    @GetMapping("/admin/designation/getall")
    public List<DesignationEntity> getAllDesignation() {
        return designationServices.getAllDesignation();
    }

    @PutMapping("/admin/designation/update")
    public ResponseEntity<String> updateDesignation(@RequestBody DesignationEntity designationDetails) {
        return designationServices.updateDesignation(designationDetails);
    }

}
