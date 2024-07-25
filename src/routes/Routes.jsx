import { createBrowserRouter } from "react-router-dom";
import {ProtectedRouteHome, ProtectedRouteLogin} from '../components/ProtectedRoute';
import Connexion from '../pages/Connexion';
import Home from '../pages/Home';


const routes = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRouteLogin><Connexion /></ProtectedRouteLogin>,
    },
    {
      path: '/home',
      element: <ProtectedRouteHome><Home /></ProtectedRouteHome>,
    },
  ])
export {routes}  