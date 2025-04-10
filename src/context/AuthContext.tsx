import { getCurrentUserAccount } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DEFAULT_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: ""
};

const INITIAL_STATE: IContextType = {
  user: DEFAULT_USER,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUserAccount();

      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio
        });
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.log("Auth check failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const isLoggedIn = await checkAuthUser();

      // to skip redirection when on sign up page
      const currentPath = window.location.pathname;
      const isSignUpRoute = ["/auth/sign-up"].includes(currentPath);

      console.log(currentPath, isSignUpRoute)

      if (!isLoggedIn && !isSignUpRoute) {
        navigate("/auth/sign-in");
      }
    };

    authenticate();
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(AuthContext);