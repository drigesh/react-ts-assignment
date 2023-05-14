import React, { useContext, useEffect } from 'react'
import { AuthContextType } from './common/Types';
import AuthContext from './context/auth/AuthContext';
import { Link, Outlet, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function GuardedRoute(props: any) {

    const {authState, setAuthState} = useContext(AuthContext) as AuthContextType;

  return (
    <div>
      {authState.loading ? <div> <br /> Authenticating... </div> : authState.loggedin ? <Outlet /> : <Navigate to="/" replace={true} />}
    </div>
  )
}

export default GuardedRoute