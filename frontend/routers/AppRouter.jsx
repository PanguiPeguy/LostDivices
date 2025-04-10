import * as React from 'react';
import {AppRoutes} from './AppRoutes.js'
import Dashboard from '../pages/Dashboard.jsx'
import Connexion from '../pages/Connexion.jsx'
import Inscription from '../pages/Inscription.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from '../pages/HomePage.jsx';
import Notification from '../pages/Notification.jsx';
import Management from '../pages/Management.jsx';
import Announcement from '../pages/Announcement.jsx';

export default function AppRouter() {
    const route = createBrowserRouter([
        {
            path: AppRoutes.DashboardPageRoute,
            element: <Dashboard/>
        },
        {
          path: AppRoutes.HomePageRoute,
          element: <HomePage/>
        },
        {
          path:AppRoutes.ConnexionPageRoute,
          element: <Connexion/>
        },
        {
          path:AppRoutes.AnnouncementPageRoute,
          element: <Announcement/>
        },
        {
          path:AppRoutes.NotificationPageRoute,
          element: <Notification/>
        },
        {
          path:AppRoutes.ManagementPageRoute,
          element: <Management/>
        },
        {
          path:AppRoutes.InscriptionPageRoute,
          element: <Inscription/>
        },
        {
          path: AppRoutes.Error404PageRoute,
          element: <div className='bg-black' ><img style = {{height: 933, width: '100%'}}  src="../src/assets/404.png" alt="404" /></div>
        }
    ])
  return (
    <div>
      <Toaster/>
      <RouterProvider router={route} />
    </div>
  )
}
