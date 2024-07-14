package com.teamtrack.teamtrack.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.entities.UserEntity;
import com.teamtrack.teamtrack.services.AuthenticationResponse;
import com.teamtrack.teamtrack.services.AuthServices;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AuthController {

    @Autowired
    AuthServices authServices;;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody UserEntity entity) {
        AuthenticationResponse response = authServices.authenticate(entity);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile/update")
    public ResponseEntity<String> updateProfile(@RequestBody EmployeeDTO entity) {
        return authServices.updateProfile(entity);
    }

}
