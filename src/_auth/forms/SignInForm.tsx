import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

import { z } from "zod"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

import { SignInFormValidation } from "@/lib/validation"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserContext } from "@/context/AuthContext"
import { useSignInUserAccount } from "@/lib/react-query/queryMutation"

const SignInForm = () => {

  const navigate = useNavigate()
  const { mutateAsync: signInUserAccount, isPending: isLoggingIn } = useSignInUserAccount()
  const { checkAuthUser } = useUserContext()

  // default values and schema
  const form = useForm<z.infer<typeof SignInFormValidation>>({
    resolver: zodResolver(SignInFormValidation),
    defaultValues: {
      email: "",
      password: ""
    }
  }
  )

  // submit function
  async function onSubmit(values: z.infer<typeof SignInFormValidation>) {

    const userSession = signInUserAccount({ email: values.email, password: values.password })

    if (userSession.error) {
      toast.error("Unable to sign in")
    } else {
      const isLoggedIn = await checkAuthUser()
      if (isLoggedIn) {
        form.reset()
        navigate("/")
      } else {
        toast.error("Sign in failed. Please try again later.")
      }
    }

  }
  return (
    <Form  {...form}>
      <div className="flex flex-col justify-center items-center pb-6">
        <h1 className="text-3xl font-bold interfont text-[1rem] sm:text-[1.4rem] md:text-[1.6rem] lr:text-[1.8rem]">
          Log in to your account
        </h1>
        <h2 className="text-gray-500 text-sm mt-2">
          Enter your credentials to access your account.
        </h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-100 sm:w-120 md:w-140 lr:w-160 max-w-200 px-8 py-6">
          {/* email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base md:text-lg lr:text-xl">Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base md:text-lg lr:text-xl">Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-sm sm:text-base md:text-lg lr:text-xl" disabled={isLoggingIn}>{
            isLoggingIn ? "Signing in" : "Sign In"
          }</Button>
        </form>
        <div className="hover:underline"><Link to={"/auth/sign-up"}>Want to create an account?<span>Register account</span></Link></div>
      </div>
    </Form>
  )
}
export default SignInForm