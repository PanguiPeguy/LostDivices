import React, { useEffect } from 'react'
import {AppRoutes} from '../routers/AppRoutes.js'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate(AppRoutes.ConnexionPageRoute)
  }})
  return (
    <div>
      <NavBar current1={true} current2={false} current3={false} current4={false}/>
    </div>
  )
}
