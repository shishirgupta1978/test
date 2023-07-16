import React, { useEffect,useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { MyContext } from '..';


export const PrivateRoute = props => {
  let location = useLocation();

  const { context } = useContext(MyContext);
    if (!context.user) {
      //dispatch(updateaccess({"url": "/api/auth/refresh/", "method": "post","data" :{'refresh':user?.refresh}}));

    return <Navigate to="/login" state={{ from: location }} />;

  }

  return props.children;
}

