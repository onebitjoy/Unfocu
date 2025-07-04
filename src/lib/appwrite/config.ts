import { Client, Account, Databases, Storage, Avatars } from "appwrite"


export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECTID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGEID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  commentsCollectionId: import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID
}

export const client = new Client()

client.setProject(appwriteConfig.projectId).setEndpoint(appwriteConfig.url)

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
