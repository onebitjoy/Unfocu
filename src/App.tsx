
import "./styles/index.css";

import { Route, Routes } from "react-router";

import { Toaster } from "@/components/ui/sonner"
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import { RootLayout } from "./_root/RootLayout";
import { HomePage } from "./_root/pages";

function App() {
  return <main className="flex h-screen overflow-auto scrollbar-hidden">
    <Routes>
      {/* private routes */}
      <Route path="auth" element={<AuthLayout />}>
        < Route path="sign-in" element={<SignInForm />} />
        < Route path="sign-up" element={<SignUpForm />} />
      </Route>

      {/* public routes */}
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
    <Toaster richColors />
  </main>
}

export default App