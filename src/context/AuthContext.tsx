import { getCurrentUserAccount } from "@/lib/appwrite/api"
import { appwriteConfig } from "@/lib/appwrite/config"
import { IContextType, IUser } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"


const DEFAULT_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: ""
}

const INITIAL_STATE = {
  user: DEFAULT_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<IUser>(DEFAULT_USER)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  async function checkAuthUser() {
    try {
      const currentUser = await getCurrentUserAccount()
      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio
        })
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // const cookieFallback = localStorage.getItem("cookieFallback");
    const cookieFallback = localStorage.getItem(`a_session_${appwriteConfig.projectId}`);
    console.log("cookieFallback:", cookieFallback)
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/auth/sign-in");
    }

    checkAuthUser();
  }, []);


  // useEffect(() => {
  //   const init = async () => {
  //     setIsLoading(true);
  //     const isLoggedIn = await checkAuthUser();
  //     if (!isLoggedIn) {
  //       navigate("/auth/sign-in");
  //     }
  //   };
  //   init();
  // }, []);

  return <AuthContext.Provider value={{
    user, setUser, isLoading, isAuthenticated, setIsAuthenticated, checkAuthUser
  }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(AuthContext)