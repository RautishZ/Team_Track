package com.teamtrack.teamtrack.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.teamtrack.DTO.LeaveDTO;
import com.teamtrack.teamtrack.DTO.LeaveManageDTO;
import com.teamtrack.teamtrack.entities.LeaveEntity;
import com.teamtrack.teamtrack.entities.LeaveEntity.Status;
import com.teamtrack.teamtrack.repositories.LeaveRepository;
import com.teamtrack.teamtrack.services.LeaveServices;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class LeaveController {
    @Autowired
    LeaveServices leaveServices;
    @Autowired
    LeaveRepository leaveRepository;

    @PostMapping("/leave/add")
    public String addLeave(@RequestBody LeaveDTO leaveDTO) {
        return leaveServices.addLeave(leaveDTO);
    }

    @DeleteMapping("/leave/delete/{leaveId}")
    public String deleteLeave(@PathVariable String leaveId) {
        System.out.println("leaveId: " + leaveId);
        return leaveServices.deleteLeave(leaveId);
    }

    @PutMapping("/leave/update")
    public String updateLeave(@RequestBody LeaveDTO leaveDTO) {
        System.out.println("leaveDTO: " + leaveDTO);
        return leaveServices.updateLeave(leaveDTO);
    }

    @GetMapping("/admin/leaves/getall")
    public List<LeaveManageDTO> getAllLeaves() {
        return leaveServices.getAllLeaves();
    }

    @PutMapping("/admin/leave/status/update")
    public String putMethodName(@RequestParam String leaveId, @RequestParam String status) {
        System.out.println("details: " + leaveId + " " + status);

        LeaveEntity leaveEntity = leaveRepository.findById(leaveId).get();
        leaveEntity.setStatus(Status.valueOf(status));
        leaveRepository.save(leaveEntity);

        return "Done";
    }
}
