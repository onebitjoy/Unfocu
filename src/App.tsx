
import "./styles/index.css";

import { Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner"
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import { RootLayout } from "./_root/RootLayout";
import { HomePage, AllUsers, CreatePost, EditPost, Explore, PostDetails, Profile, Saved, UpdateProfile } from "./_root/pages";
import { useThemeContext } from "./context";
import { useUserContext } from "./context/AuthContext";
import Notifications from "./_root/pages/Notifications";

function App() {

  const { isDark } = useThemeContext()
  const { isLoading } = useUserContext()

  if (isLoading) return <div>Loading...</div>
  return <main className={`scrollbar-hidden flex h-screen overflow-auto dark:text-white interfont ${isDark ? "dark" : ""} dark:bg-black`}>
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
        <Route path="create-post" element={<CreatePost />} />
        <Route path="explore" element={<Explore />} />
        <Route path="saved" element={<Saved />} />
        <Route path="edit-post/:id" element={<EditPost />} />
        <Route path="posts/:id" element={<PostDetails />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="update-profile/:id" element={<UpdateProfile />} />
      </Route>

    </Routes>
    <Toaster richColors />
  </main>
}

export default App