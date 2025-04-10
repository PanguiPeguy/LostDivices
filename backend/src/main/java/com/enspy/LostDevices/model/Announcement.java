package com.enspy.LostDevices.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "announcements")
public class Announcement {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String deviceType;
    
    @Column(nullable = false)
    private String brand;
    
    @Column(nullable = false)
    private String model;
    
    private String serialNumber;
    
    @Column(nullable = false)
    private String color;
    
    @Column(nullable = false, length = 1000)
    private String description;
    
    @Column(nullable = false)
    private String ownerName;
    
    @Column(nullable = false)
    private String ownerPhone;
    
    @Column(nullable = false)
    private String ownerEmail;
    
    @Column(nullable = false)
    private LocalDate date;
    
    // Constructeurs
    public Announcement() {
    }
    
    public Announcement(Long id, String deviceType, String brand, String model, String serialNumber, 
                        String color, String description, String ownerName, String ownerPhone, 
                        String ownerEmail, LocalDate date) {
        this.id = id;
        this.deviceType = deviceType;
        this.brand = brand;
        this.model = model;
        this.serialNumber = serialNumber;
        this.color = color;
        this.description = description;
        this.ownerName = ownerName;
        this.ownerPhone = ownerPhone;
        this.ownerEmail = ownerEmail;
        this.date = date;
    }
    
    // Getters et Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getDeviceType() {
        return deviceType;
    }
    
    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }
    
    public String getBrand() {
        return brand;
    }
    
    public void setBrand(String brand) {
        this.brand = brand;
    }
    
    public String getModel() {
        return model;
    }
    
    public void setModel(String model) {
        this.model = model;
    }
    
    public String getSerialNumber() {
        return serialNumber;
    }
    
    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }
    
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getOwnerName() {
        return ownerName;
    }
    
    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }
    
    public String getOwnerPhone() {
        return ownerPhone;
    }
    
    public void setOwnerPhone(String ownerPhone) {
        this.ownerPhone = ownerPhone;
    }
    
    public String getOwnerEmail() {
        return ownerEmail;
    }
    
    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    // equals, hashCode et toString
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Announcement other = (Announcement) obj;
        return id != null && id.equals(other.getId());
    }
    
    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
    
    @Override
    public String toString() {
        return "Announcement{" +
                "id=" + id +
                ", deviceType='" + deviceType + '\'' +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", serialNumber='" + serialNumber + '\'' +
                ", color='" + color + '\'' +
                ", ownerName='" + ownerName + '\'' +
                ", ownerEmail='" + ownerEmail + '\'' +
                ", date=" + date +
                '}';
    }
}