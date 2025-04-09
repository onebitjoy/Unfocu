import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SignUpFormValidation } from "@/lib"

// UI imports
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import { toast } from "sonner"
import { useCreateUserAccount, useSignInUserAccount } from "@/lib/react-query/queryMutation"
import { useUserContext } from "@/context/AuthContext"
import { useNavigate } from "react-router"

// Sign Up form component
const SignUpForm = () => {

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount()
  const { mutateAsync: signInUserAccount, isPending: isSignInUser } = useSignInUserAccount()

  // context
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

  // navigate
  const navigate = useNavigate()
  // Form Controller
  const form = useForm<z.infer<Omit<typeof SignUpFormValidation, "confirmPassword">>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Submit Handler
  async function onSubmit(values: z.infer<typeof SignUpFormValidation>) {
    const newUser = await createUserAccount(values)

    if (!newUser) {
      toast.error("Sign up failed. Please retry!")
      return;
    }

    // TODO : Login user automatically
    const session =
      await signInUserAccount({ email: values.email, password: values.password })
    console.log(session)

    if (!session) {
      toast.error("Sign in failed. Please try signing into your account.")
    }

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn) {
      form.reset()
      navigate("/")
    } else {
      toast.error("Sign up failed. Please try again later.")
    }
  }

  console.log("SignUpForm rendered");

  // Sign in return
  return (<Form {...form} >
    <div className="flex flex-col justify-center items-center pb-6">
      <h1 className="text-3xl font-bold interfont text-[1rem] sm:text-[1.4rem] md:text-[1.6rem] lr:text-[1.8rem]">Create a new account</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-100 sm:w-120 md:w-140 lr:w-160 max-w-200 px-8 py-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base md:text-lg lr:text-xl">Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base md:text-lg lr:text-xl">Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base md:text-lg lr:text-xl">Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="re-enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="text-sm sm:text-base md:text-lg lr:text-xl" disabled={isSignInUser || isCreatingUser}>{
          isCreatingUser ? "Creating your account..." : isSignInUser ? "Signing you in..." : "Submit"
        }</Button>
      </form>
      <div className="hover:underline"><Link to={"/auth/sign-in"}>Already have an account? <span>Sign-In</span></Link></div>
    </div >
  </Form >
  )
}
export default SignUpForm