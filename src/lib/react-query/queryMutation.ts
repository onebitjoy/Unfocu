import { Comment, INewPost, INewUser } from "@/types"
// import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPost, createUserAccount, getRecentPosts, logOutUserAccount, signInUserAccount, writeComment } from "../appwrite/api"
import { QUERY_KEYS } from "./queryKey"

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
        { queryKey: [QUERY_KEYS.GET_RECENT_POSTS] }
      )
    }
  })
}

export function useGetRecentPosts() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts
  })
}

export function useWriteCommentToPost() {
  return useMutation({
    mutationFn: (comment: Comment) => writeComment(comment)
  })
}