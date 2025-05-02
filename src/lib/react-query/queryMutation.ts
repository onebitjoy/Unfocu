import { INewPost, INewUser } from "@/types"
// import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost, createUserAccount, logOutUserAccount, signInUserAccount } from "../appwrite/api"
import { QUERY_KEYS, REACT_QUERY_KEYS } from "./queryKey"

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

export function useCreatePost() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        }
      )
    }
  })
}