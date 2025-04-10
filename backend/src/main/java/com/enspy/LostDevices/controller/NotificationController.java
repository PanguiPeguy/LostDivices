package com.enspy.LostDevices.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enspy.LostDevices.model.Notification;
import com.enspy.LostDevices.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*") // Pour le développement, à modifier en production
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;
    
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/announcement/{announcementId}")
    public ResponseEntity<List<Notification>> getNotificationsByAnnouncementId(@PathVariable Long announcementId) {
        return ResponseEntity.ok(notificationService.getNotificationsByAnnouncementId(announcementId));
    }
    
    @PostMapping("/announcement/{announcementId}")
    public ResponseEntity<Notification> createNotification(
            @PathVariable Long announcementId,
            @RequestBody Notification notification) {
        try {
            Notification createdNotification = notificationService.createNotification(announcementId, notification);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdNotification);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        try {
            Notification updatedNotification = notificationService.markAsRead(id);
            return ResponseEntity.ok(updatedNotification);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/unread/count")
    public ResponseEntity<Long> countUnreadNotifications() {
        return ResponseEntity.ok(notificationService.countUnreadNotifications());
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications() {
        return ResponseEntity.ok(notificationService.getUnreadNotifications());
    }
}
