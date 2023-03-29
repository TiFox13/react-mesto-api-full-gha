import React from 'react';
import { Navigate } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
const ProtectedRouteElement = ({ element, loggedIn  }) => {

  return (
    loggedIn ? element : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRouteElement; 