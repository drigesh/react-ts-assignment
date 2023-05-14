import React, { useState } from 'react'
import { IAuthState } from '../../common/Interfaces';
import { Prop } from '../../common/Types';
import AuthContext from './AuthContext';

function AuthState({children}: Prop) {

    
    const [authState, setAuthState] = useState<IAuthState>({
        loggedin: false,
        email: '',
        loading: true
    })

  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthState