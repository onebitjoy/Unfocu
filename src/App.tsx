import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import { HomePage } from "./_root/pages";
import { RootLayout } from "./_root/RootLayout";
import "./styles/index.css";

import { BrowserRouter, Route, Routes } from "react-router";

import { Toaster } from "@/components/ui/sonner"

function App() {
  return <main className="flex h-screen">
    <BrowserRouter>

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
    </BrowserRouter>
    <Toaster />
  </main>
}

export default App