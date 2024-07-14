package com.teamtrack.teamtrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamtrack.teamtrack.entities.IdNumberTrackerEntity;

public interface IdNumberTrackerRepository extends JpaRepository<IdNumberTrackerEntity, String> {

}
