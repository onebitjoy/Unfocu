import { INewUser } from "@/types"
// import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { createUserAccount, logOutUserAccount, signInUserAccount } from "../appwrite/api"

// React query is acting as a plug between the api functions and the frontend by being the caller

export function useCreateUserAccount() {
  return useMutation({
    mutationFn: (user: INewUser) => {
      return createUserAccount(user)
    }
  })
}

export function useSignInUserAccount() {
  return useMutation({
    mutationFn: (user: { email: string, password: string }) => signInUserAccount(user)
  })
}


export function useLogOutUserAccount() {
  return useMutation({
    mutationFn: logOutUserAccount
  })
}