package com.teamtrack.teamtrack.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.teamtrack.teamtrack.repositories.IdNumberTrackerRepository;
import com.teamtrack.teamtrack.entities.IdNumberTrackerEntity;

import java.util.Optional;

@Service
public class IdGeneraterServices {

    @Autowired
    IdNumberTrackerRepository idNumberTrackerRepository;

    public String generateId(String prefix, String id) {
        // Ensure the prefix is capitalized properly

        Optional<IdNumberTrackerEntity> tracker = idNumberTrackerRepository.findById(id);

        if (tracker.isPresent()) {
            IdNumberTrackerEntity existingTracker = tracker.get();
            existingTracker.setLastIdNumber(existingTracker.getLastIdNumber() + 1);
            idNumberTrackerRepository.save(existingTracker);
            return prefix.toUpperCase() + (10000 + existingTracker.getLastIdNumber());
        } else {
            IdNumberTrackerEntity newTracker = new IdNumberTrackerEntity();
            newTracker.setIdName(id);
            newTracker.setLastIdNumber(1L);
            idNumberTrackerRepository.save(newTracker);
            return prefix.toUpperCase() + "0000" + 1;
        }
    }
}
