package com.enspy.LostDevices.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enspy.LostDevices.model.Announcement;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByDeviceTypeContainingIgnoreCase(String deviceType);
    List<Announcement> findByBrandContainingIgnoreCase(String brand);
    List<Announcement> findByDateAfter(LocalDate date);
    List<Announcement> findByOwnerEmail(String email);
}
