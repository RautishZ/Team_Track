package com.teamtrack.teamtrack.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.teamtrack.entities.AttendanceEntity;
import com.teamtrack.teamtrack.entities.AttendanceEntity.AttendanceStatus;

public interface AttendanceRepository extends JpaRepository<AttendanceEntity, Long> {

    List<AttendanceEntity> findAllByDate(LocalDate attendanceDate);

    Long countByStatus(AttendanceStatus status);

}
