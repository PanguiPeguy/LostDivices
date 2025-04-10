package com.enspy.LostDevices.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enspy.LostDevices.model.Announcement;
import com.enspy.LostDevices.repository.AnnouncementRepository;
import com.enspy.LostDevices.repository.NotificationRepository;

@Service
public class AnnouncementService {
    
    @Autowired
    private AnnouncementRepository announcementRepository;
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }
    
    public Optional<Announcement> getAnnouncementById(Long id) {
        return announcementRepository.findById(id);
    }
    
    public Announcement saveAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }
    
    @Transactional
    public void deleteAnnouncement(Long id) {
        // Supprimer d'abord toutes les notifications associées
        notificationRepository.findByAnnouncementId(id)
            .forEach(notification -> notificationRepository.delete(notification));
        
        // Puis supprimer l'annonce
        announcementRepository.deleteById(id);
    }
    
    public List<Announcement> searchByDeviceType(String deviceType) {
        return announcementRepository.findByDeviceTypeContainingIgnoreCase(deviceType);
    }
    
    public List<Announcement> searchByBrand(String brand) {
        return announcementRepository.findByBrandContainingIgnoreCase(brand);
    }
    
    public List<Announcement> findByOwnerEmail(String email) {
        return announcementRepository.findByOwnerEmail(email);
    }
}

