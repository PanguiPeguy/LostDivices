import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import { announcementService, notificationService } from '../services/Api';

export default function Announcement() {
  // État pour stocker les annonces
  const [announcements, setAnnouncements] = useState([]);
  
  // État pour le nouveau message
  const [newMessage, setNewMessage] = useState({
    announcementId: null,
    senderName: "",
    senderEmail: "",
    message: ""
  });

  // États pour gérer l'interface
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les annonces
        const announcementsResponse = await announcementService.getAllAnnouncements();
        setAnnouncements(announcementsResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        setLoading(false);
        console.error("Erreur de chargement :", err);
      }
    };
    
    fetchData();
  }, []);

  // Gérer les changements dans le formulaire de message
  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({ ...prev, [name]: value }));
  };

  // Envoyer un message à propos d'une annonce
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await notificationService.createNotification(
        newMessage.announcementId, 
        {
          senderName: newMessage.senderName,
          senderEmail: newMessage.senderEmail,
          message: newMessage.message
        }
      );
      
      // Réinitialiser le formulaire après envoi
      setShowMessageForm(false);
      setNewMessage({
        announcementId: null,
        senderName: "",
        senderEmail: "",
        message: ""
      });
      
      // Afficher un message de confirmation
      alert("Votre message a été envoyé avec succès!");
      
    } catch (err) {
      setError("Erreur lors de l'envoi du message");
      console.error("Erreur d'envoi :", err);
    }
  };

  // Préparer le formulaire de message pour une annonce spécifique
  const prepareMessageForm = (announcementId) => {
    setNewMessage(prev => ({ ...prev, announcementId }));
    setShowMessageForm(true);
  };

  return (
    <div>
      <NavBar current1={false} current2={true} current3={false} current4={false}/>
      
      {/* Message Form Modal */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Envoyer un message</h3>
            </div>
            
            <form onSubmit={handleMessageSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre nom
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={newMessage.senderName}
                  onChange={handleMessageChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre email
                </label>
                <input
                  type="email"
                  name="senderEmail"
                  value={newMessage.senderEmail}
                  onChange={handleMessageChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre message
                </label>
                <textarea
                  name="message"
                  value={newMessage.message}
                  onChange={handleMessageChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  rows="4"
                  placeholder="Décrivez les informations que vous avez concernant cet appareil..."
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowMessageForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Liste des annonces */}
      {loading ? (
        <div className="p-8 text-center">
          <p className="text-gray-500">Chargement des annonces...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid m-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-gray-100 rounded-lg">
              <p className="text-gray-600">Aucune annonce disponible pour le moment.</p>
            </div>
          ) : (
            announcements.map(announcement => (
              <div 
                key={announcement.id} 
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="bg-red-100 p-3 border-b border-red-200">
                  <h3 className="font-bold text-lg text-red-700">{announcement.deviceType} {announcement.brand}</h3>
                  <p className="text-gray-600">{announcement.model} - {announcement.color}</p>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">{announcement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Date: {new Date(announcement.date).toLocaleDateString('fr-FR')}
                    </p>
                    {announcement.serialNumber && (
                      <p className="text-xs text-gray-500">
                        N° série: {announcement.serialNumber}
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <h4 className="text-sm font-semibold mb-1">Contact propriétaire:</h4>
                    <p className="text-sm">{announcement.ownerName}</p>
                    <div className="flex flex-col mt-1">
                      <a 
                        href={`tel:${announcement.ownerPhone.replace(/\s/g, '')}`}
                        className="text-blue-600 hover:underline text-sm flex items-center"
                      >
                        <span>📱</span>
                        <span className="ml-1">{announcement.ownerPhone}</span>
                      </a>
                      <a 
                        href={`mailto:${announcement.ownerEmail}`}
                        className="text-blue-600 hover:underline text-sm flex items-center mt-1"
                      >
                        <span>✉️</span>
                        <span className="ml-1">{announcement.ownerEmail}</span>
                      </a>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => prepareMessageForm(announcement.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Envoyer un message
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}