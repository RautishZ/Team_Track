package com.teamtrack.teamtrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.teamtrack.entities.LeaveEntity;
import com.teamtrack.teamtrack.entities.LeaveEntity.Status;

import java.util.List;

public interface LeaveRepository extends JpaRepository<LeaveEntity, String> {

    List<LeaveEntity> findAllByUserUserId(String userId);

    Long countByStatus(Status status);

}
