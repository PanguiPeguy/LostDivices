import React, { useState, useEffect } from "react";
import NavBar from '../components/NavBar.jsx';
import { announcementService } from '../services/Api';

export default function Management() {
  // État pour stocker les annonces
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour contrôler l'affichage du formulaire
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState('announcements');

  // État pour le formulaire d'ajout
  const [newAnnouncement, setNewAnnouncement] = useState({
    deviceType: "",
    brand: "",
    model: "",
    serialNumber: "",
    color: "",
    description: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    date: new Date().toISOString().split('T')[0]
  });

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

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({ ...prev, [name]: value }));
  };
  
  // Ajouter une nouvelle annonce
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await announcementService.createAnnouncement(newAnnouncement);
      setAnnouncements(prev => [...prev, response.data]);
      setNewAnnouncement({
        deviceType: "",
        brand: "",
        model: "",
        serialNumber: "",
        color: "",
        description: "",
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
        date: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
    } catch (err) {
      setError("Erreur lors de la création de l'annonce");
      console.error("Erreur de création :", err);
    }
  };

  // Filtrer les annonces par propriétaire (pour "Mes annonces")
  const getMyAnnouncements = () => {
    // Cette fonction nécessiterait normalement une authentification
    // Ici, nous simulons avec une entrée utilisateur ou un état stocké
    const userEmail = localStorage.getItem('userEmail') || '';
    return announcements.filter(a => a.ownerEmail === userEmail);
  };

  // Changer de vue (toutes les annonces, mes annonces)
  const switchView = (view) => {
    setCurrentView(view);
  };

  // Rendu d'une annonce
  const renderAnnouncement = (announcement) => (
    <div 
      key={announcement.id} 
      className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="bg-blue-100 p-3 border-b border-blue-200">
        <h3 className="font-bold text-lg text-blue-700">{announcement.deviceType} {announcement.brand}</h3>
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
      </div>
    </div>
  );

  return(
    <div>
      <NavBar current1={false} current2={false} current3={true} current4={false}/>
      <div className="mb-6 m-4 flex justify-end">
        <button 
          onClick={() => {
            setShowForm(!showForm);
            switchView('announcements');
          }}
          className={`bg-blue-500 m-auto relative hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors`}
        >
          {showForm ? "Annuler" : "Ajouter une annonce"}
        </button>
        <button
          className={`${currentView === 'myAnnouncements' ? 'bg-blue-700' : 'bg-blue-500'} m-auto relative hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors ml-2`}
          onClick={() => switchView('myAnnouncements')}
        >
          Mes Annonces
        </button>
      </div>

      {/* Affichage du formulaire ou des annonces */}
      {showForm ? (
        <div className="bg-white m-4 shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Nouvelle annonce</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'appareil
                </label>
                <input
                  type="text"
                  name="deviceType"
                  value={newAnnouncement.deviceType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  placeholder="Smartphone, Ordinateur..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marque
                </label>
                <input
                  type="text"
                  name="brand"
                  value={newAnnouncement.brand}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  placeholder="Apple, Samsung..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modèle
                </label>
                <input
                  type="text"
                  name="model"
                  value={newAnnouncement.model}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  placeholder="iPhone 15, Galaxy S23..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de série
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  value={newAnnouncement.serialNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Optionnel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Couleur
                </label>
                <input
                  type="text"
                  name="color"
                  value={newAnnouncement.color}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  placeholder="Noir, Blanc, Or..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de la perte/vol
                </label>
                <input
                  type="date"
                  name="date"
                  value={newAnnouncement.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description des circonstances
                </label>
                <textarea
                  name="description"
                  value={newAnnouncement.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  rows="3"
                  placeholder="Décrivez quand et où l'appareil a été perdu ou volé..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du propriétaire
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={newAnnouncement.ownerName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  name="ownerPhone"
                  value={newAnnouncement.ownerPhone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  placeholder="06 12 34 56 78"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={newAnnouncement.ownerEmail}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  placeholder="votre.email@exemple.com"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition-colors"
              >
                Publier l'annonce
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="m-4">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Chargement des annonces...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : currentView === 'myAnnouncements' ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Mes annonces</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getMyAnnouncements().length === 0 ? (
                  <div className="col-span-full p-8 text-center bg-gray-100 rounded-lg">
                    <p className="text-gray-600">Vous n'avez pas encore créé d'annonces.</p>
                  </div>
                ) : (
                  getMyAnnouncements().map(announcement => renderAnnouncement(announcement))
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Toutes les annonces</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.length === 0 ? (
                  <div className="col-span-full p-8 text-center bg-gray-100 rounded-lg">
                    <p className="text-gray-600">Pas d'annonces pour le moment.</p>
                  </div>
                ) : (
                  announcements.map(announcement => renderAnnouncement(announcement))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}