import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, onAuthStateChange } from './supabaseAuth';

type AuthContextType = {
  userRole: number | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setUserRole(user.role);
      } else {
        setUserRole(null);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe.data?.subscription?.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { user, error } = await getCurrentUser();
    if (user) {
      setUserRole(user.role);
    }
    
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ userRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
