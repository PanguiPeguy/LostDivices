// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const announcementService = {
  getAllAnnouncements: () => api.get('/announcements'),
  getAnnouncementById: (id) => api.get(`/announcements/${id}`),
  createAnnouncement: (announcement) => api.post('/announcements', announcement),
  updateAnnouncement: (id, announcement) => api.put(`/announcements/${id}`, announcement),
  deleteAnnouncement: (id) => api.delete(`/announcements/${id}`),
  searchByDeviceType: (type) => api.get(`/announcements/search/type?type=${type}`),
  searchByBrand: (brand) => api.get(`/announcements/search/brand?brand=${brand}`),
  getByOwnerEmail: (email) => api.get(`/announcements/owner?email=${email}`),
};

export const notificationService = {
  getAllNotifications: () => api.get('/notifications'),
  getNotificationById: (id) => api.get(`/notifications/${id}`),
  getNotificationsByAnnouncementId: (announcementId) => api.get(`/notifications/announcement/${announcementId}`),
  createNotification: (announcementId, notification) => api.post(`/notifications/announcement/${announcementId}`, notification),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  countUnreadNotifications: () => api.get('/notifications/unread/count'),
  getUnreadNotifications: () => api.get('/notifications/unread'),
};

export default {
  announcements: announcementService,
  notifications: notificationService,
};