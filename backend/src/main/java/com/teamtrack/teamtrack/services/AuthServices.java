package com.teamtrack.teamtrack.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.DTO.EmployeeDTO;
import com.teamtrack.teamtrack.entities.UserEntity;
import com.teamtrack.teamtrack.repositories.UserRepository;

@Service
public class AuthServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtServices jwtServices;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    IdGeneraterServices idGeneraterServices;

    public AuthenticationResponse authenticate(UserEntity request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        UserEntity userEntity = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        String token = jwtServices.generateToken(userEntity);

        return new AuthenticationResponse(token);
    }

    public ResponseEntity<String> updateProfile(EmployeeDTO entity) {
        UserEntity userEntity = userRepository.findById(entity.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

        userEntity.setFirstName(entity.getFirstName());
        userEntity.setLastName(entity.getLastName());
        userEntity.setPhoneNumber(entity.getPhoneNumber());
        userEntity.setEmail(entity.getEmail());
        userEntity.setPassword(passwordEncoder.encode(entity.getPassword()));
        userEntity.getEmployee().setAddress(entity.getAddress());
        userEntity.getEmployee().setDateOfBirth(entity.getDateOfBirth());
        userEntity.getEmployee().setGender(entity.getGender());
        userEntity.getEmployee().setHireDate(entity.getHireDate());
        userEntity.getEmployee().setFirstName(entity.getFirstName());
        userEntity.getEmployee().setLastName(entity.getLastName());

        userRepository.save(userEntity);

        return ResponseEntity.ok("Profile Updated Successfully");
    }

}
