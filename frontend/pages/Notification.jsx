import React, { useState, useEffect } from "react";
import NavBar from '../components/NavBar.jsx';
import { notificationService, announcementService } from '../services/Api';

export default function Notification() {
  // État pour stocker les annonces
  const [announcements, setAnnouncements] = useState([]);
  // État pour les notifications
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Charger les données au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les annonces (important pour l'affichage des détails d'annonce dans les notifications)
        const announcementsResponse = await announcementService.getAllAnnouncements();
        setAnnouncements(announcementsResponse.data);
        
        // Récupérer les notifications
        const notificationsResponse = await notificationService.getAllNotifications();
        setNotifications(notificationsResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
        console.error("Erreur de chargement :", err);
      }
    };
    
    fetchData();
  }, []);
  
  // Marquer une notification comme lue
  const markAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
    } catch (err) {
      setError("Erreur lors du marquage de la notification comme lue");
      console.error("Erreur de mise à jour :", err);
    }
  };

  return(
    <div>
      <NavBar current1={false} current2={false} current3={false} current4={true}/>
        
      {/* Centre de notifications */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <h2 className="text-lg font-semibold text-gray-700">Centre de notifications</h2>
          <p className="text-sm text-gray-500">Messages concernant vos appareils perdus ou volés</p>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Chargement des notifications...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {notifications.map(notification => {
              // Trouver l'annonce correspondante
              const relatedAnnouncement = announcements.find(a => a.id === notification.announcementId);
              
              return (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">
                      {relatedAnnouncement ? (
                        <>Message concernant: {relatedAnnouncement.deviceType} {relatedAnnouncement.brand}</>
                      ) : (
                        <>Message concernant une annonce</>
                      )}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.date).toLocaleDateString('fr-FR')} {new Date(notification.date).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-700">{notification.message}</p>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>De: {notification.senderName}</p>
                    <a 
                      href={`mailto:${notification.senderEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {notification.senderEmail}
                    </a>
                  </div>
                  
                  {!notification.isRead && (
                    <div className="mt-2 flex justify-between items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Non lu
                      </span>
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Marquer comme lu
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">Vous n'avez pas de notifications pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}