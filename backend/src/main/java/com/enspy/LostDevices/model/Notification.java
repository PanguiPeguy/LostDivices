package com.enspy.LostDevices.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "announcement_id", nullable = false)
    private Announcement announcement;
    
    @Column(nullable = false)
    private String senderName;
    
    @Column(nullable = false)
    private String senderEmail;
    
    @Column(nullable = false, length = 1000)
    private String message;
    
    @Column(nullable = false)
    private LocalDateTime date;
    
    @Column(nullable = false)
    private boolean isRead;
    
    // Constructeurs
    public Notification() {
    }
    
    public Notification(Long id, Announcement announcement, String senderName, String senderEmail, 
                       String message, LocalDateTime date, boolean isRead) {
        this.id = id;
        this.announcement = announcement;
        this.senderName = senderName;
        this.senderEmail = senderEmail;
        this.message = message;
        this.date = date;
        this.isRead = isRead;
    }
    
    // Getters et Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Announcement getAnnouncement() {
        return announcement;
    }
    
    public void setAnnouncement(Announcement announcement) {
        this.announcement = announcement;
    }
    
    public String getSenderName() {
        return senderName;
    }
    
    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }
    
    public String getSenderEmail() {
        return senderEmail;
    }
    
    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public LocalDateTime getDate() {
        return date;
    }
    
    public void setDate(LocalDateTime date) {
        this.date = date;
    }
    
    public boolean isRead() {
        return isRead;
    }
    
    public void setRead(boolean isRead) {
        this.isRead = isRead;
    }
    
    // equals, hashCode et toString
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Notification other = (Notification) obj;
        return id != null && id.equals(other.getId());
    }
    
    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
    
    @Override
    public String toString() {
        return "Notification{" +
                "id=" + id +
                ", announcement=" + (announcement != null ? announcement.getId() : null) +
                ", senderName='" + senderName + '\'' +
                ", senderEmail='" + senderEmail + '\'' +
                ", date=" + date +
                ", isRead=" + isRead +
                '}';
    }
}