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
import { createUserAccount } from "@/lib/appwrite/api"


// Sign Up form component
const SignUpForm = () => {

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
      return;
    }
  }

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
        <Button type="submit" className="text-sm sm:text-base md:text-lg lr:text-xl">Submit</Button>
      </form>
      <div className="hover:underline"><Link to={"/auth/sign-in"}>Already have an account? <span>Sign-In</span></Link></div>
    </div >
  </Form >
  )
}
export default SignUpForm