package com.teamtrack.teamtrack.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.teamtrack.DTO.LoginDTO;
import com.teamtrack.teamtrack.services.LoginServices;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class LoginController {

    @Autowired
    LoginServices loginServices;

    @GetMapping("/userdetails")
    public LoginDTO LoginDetails(HttpServletRequest request) {

        return loginServices.LoginDetails(request);
    }

}
