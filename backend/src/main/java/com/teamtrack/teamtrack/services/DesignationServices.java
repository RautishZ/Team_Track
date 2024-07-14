package com.teamtrack.teamtrack.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.entities.DesignationEntity;
import com.teamtrack.teamtrack.repositories.DesignationRepository;

@Service
public class DesignationServices {

    @Autowired
    DesignationRepository designationRepository;
    @Autowired
    IdGeneraterServices idGeneraterServices;

    public void addDesignation(DesignationEntity designationDetails) {
        designationDetails.setDesignationId(idGeneraterServices.generateId("DS", "Designation"));
        designationRepository.save(designationDetails);
    }

    public List<DesignationEntity> getAllDesignation() {

        return designationRepository.findAll();

    }

    public ResponseEntity<String> updateDesignation(DesignationEntity designationDetails) {
        try {
            designationRepository.save(designationDetails);
            return ResponseEntity.ok("Updated");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update designation: " + e.getMessage());
        }
    }

    public Long getAllDesignations() {
        return designationRepository.count();
    }

    public DesignationEntity findByName(String designationName) {
        return designationRepository.findByDesignationName(designationName);
    }

}
