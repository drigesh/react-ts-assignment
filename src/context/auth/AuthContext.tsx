import React, { createContext } from 'react'
import { AuthContextType } from '../../common/Types';

export const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext