package com.enspy.LostDevices.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enspy.LostDevices.model.Announcement;
import com.enspy.LostDevices.service.AnnouncementService;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "*") // Pour le développement, à modifier en production
public class AnnouncementController {
    
    @Autowired
    private AnnouncementService announcementService;
    
    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        return ResponseEntity.ok(announcementService.getAllAnnouncements());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable Long id) {
        return announcementService.getAnnouncementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(announcementService.saveAnnouncement(announcement));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Announcement> updateAnnouncement(
            @PathVariable Long id, 
            @RequestBody Announcement announcementDetails) {
        
        return announcementService.getAnnouncementById(id)
                .map(existingAnnouncement -> {
                    existingAnnouncement.setDeviceType(announcementDetails.getDeviceType());
                    existingAnnouncement.setBrand(announcementDetails.getBrand());
                    existingAnnouncement.setModel(announcementDetails.getModel());
                    existingAnnouncement.setSerialNumber(announcementDetails.getSerialNumber());
                    existingAnnouncement.setColor(announcementDetails.getColor());
                    existingAnnouncement.setDescription(announcementDetails.getDescription());
                    existingAnnouncement.setOwnerName(announcementDetails.getOwnerName());
                    existingAnnouncement.setOwnerPhone(announcementDetails.getOwnerPhone());
                    existingAnnouncement.setOwnerEmail(announcementDetails.getOwnerEmail());
                    existingAnnouncement.setDate(announcementDetails.getDate());
                    
                    return ResponseEntity.ok(announcementService.saveAnnouncement(existingAnnouncement));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        if (announcementService.getAnnouncementById(id).isPresent()) {
            announcementService.deleteAnnouncement(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/search/type")
    public ResponseEntity<List<Announcement>> searchByDeviceType(@RequestParam String type) {
        return ResponseEntity.ok(announcementService.searchByDeviceType(type));
    }
    
    @GetMapping("/search/brand")
    public ResponseEntity<List<Announcement>> searchByBrand(@RequestParam String brand) {
        return ResponseEntity.ok(announcementService.searchByBrand(brand));
    }
    
    @GetMapping("/owner")
    public ResponseEntity<List<Announcement>> getByOwnerEmail(@RequestParam String email) {
        return ResponseEntity.ok(announcementService.findByOwnerEmail(email));
    }
}

