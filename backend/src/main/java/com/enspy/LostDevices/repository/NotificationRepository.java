package com.enspy.LostDevices.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enspy.LostDevices.model.Announcement;
import com.enspy.LostDevices.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByAnnouncement(Announcement announcement);
    List<Notification> findByAnnouncementId(Long announcementId);
    List<Notification> findByIsReadFalse();
    long countByIsReadFalse();
}