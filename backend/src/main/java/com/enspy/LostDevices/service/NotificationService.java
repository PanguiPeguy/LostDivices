package com.enspy.LostDevices.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enspy.LostDevices.model.Announcement;
import com.enspy.LostDevices.model.Notification;
import com.enspy.LostDevices.repository.AnnouncementRepository;
import com.enspy.LostDevices.repository.NotificationRepository;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private AnnouncementRepository announcementRepository;
    
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }
    
    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }
    
    public List<Notification> getNotificationsByAnnouncementId(Long announcementId) {
        return notificationRepository.findByAnnouncementId(announcementId);
    }
    
    public Notification createNotification(Long announcementId, Notification notification) {
        Optional<Announcement> announcementOpt = announcementRepository.findById(announcementId);
        if (announcementOpt.isPresent()) {
            notification.setAnnouncement(announcementOpt.get());
            notification.setDate(LocalDateTime.now());
            notification.setRead(false);
            return notificationRepository.save(notification);
        }
        throw new IllegalArgumentException("Annonce non trouvée avec l'ID: " + announcementId);
    }
    
    public Notification markAsRead(Long id) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setRead(true);
            return notificationRepository.save(notification);
        }
        throw new IllegalArgumentException("Notification non trouvée avec l'ID: " + id);
    }
    
    public long countUnreadNotifications() {
        return notificationRepository.countByIsReadFalse();
    }
    
    public List<Notification> getUnreadNotifications() {
        return notificationRepository.findByIsReadFalse();
    }
}
