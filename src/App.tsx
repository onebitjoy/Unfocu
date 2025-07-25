
import "./styles/index.css";

import { Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner"
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import { RootLayout } from "./_root/RootLayout";
import { HomePage, AllUsers, EditPost, Explore, PostDetails, Profile, Saved, UpdateProfile } from "./_root/pages";
import { useThemeContext } from "./context";
import { useUserContext } from "./context/AuthContext";
import Notifications from "./_root/pages/Notifications";
import PageNotFound from "./commonpath/PageNotFound";

function App() {

  const { isDark } = useThemeContext()
  const { isLoading } = useUserContext()
  const loadingColors = isDark ? "w-dvw h-dvh flex justify-center items-center bg-black flex-col" : "w-dvw h-dvh flex justify-center items-center flex-col"
  return isLoading ? (<div className={loadingColors}>
    <img src="/assets/PixagramIcon.png" alt="Pixagram" width={96} height={96} className="mt-32" />
    <p className="m-auto mt-16 text-bold text-red-400 text-lg text-center text-pretty">Hello, Appwrite is having some problems on Airtel networks in India! So, it might not be accessible to some users! <br />
      <span className="text-blue-400">So, this site might not be working correctly even when the code is working! Please visit my github &rarr; <a href="https://github.com/onebitjoy/Unfocu" target="_blank" className="decoration-wavy underline underline-offset-2">Pixagram</a></span></p>
  </div >) : (<main className={`scrollbar-hidden flex h-screen overflow-auto dark:text-white interfont ${isDark ? "dark" : ""} dark:bg-black`}>
    <Routes>
      {/* private routes */}
      <Route path="auth" element={<AuthLayout />}>
        < Route path="sign-in" element={<SignInForm />} />
        < Route path="sign-up" element={<SignUpForm />} />
      </Route>

      {/* public routes */}
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="all-users" element={<AllUsers />} />
        <Route path="explore" element={<Explore />} />
        <Route path="saved" element={<Saved />} />
        <Route path="edit-post/:id" element={<EditPost />} />
        <Route path="posts/:id" element={<PostDetails />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="update-profile/:id" element={<UpdateProfile />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />

    </Routes>
    <Toaster richColors position="bottom-center" />
  </main>)
}

export default App