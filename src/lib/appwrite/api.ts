import { AppwriteException, ID, ImageGravity, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { INewPost, INewUser } from "@/types";
import { toast } from "sonner";


// Create User
export async function createUserAccount(user: INewUser) {
  // 1. Appwrite uses account.create function with positional arguments to create an account
  // 2. Saving the user to database
  // 3. Returns User or an Error
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    )

    if (!newAccount) throw new Error("Account can't be created!")

    const avatarUrl = avatars.getInitials(user.name)

    // saving user to user DB
    const newUser = await saveUserToDatabase({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl
    })
    return newUser
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 409) {
      toast.error("A user with the same id, email, or phone already exists.");
      return null;
    }
    console.error(error)
    return error
  }
}

// Save user to database
async function saveUserToDatabase(user: {
  accountId: string,
  email: string,
  name: string,
  imageUrl: string,
  username?: string
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )
    return newUser
  } catch (error) {
    console.log(error)
  }
}

// Sign in User
export async function signInUserAccount(user: {
  email: string, password: string
}) {
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password)
    return session
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      if (error.code === 401) {
        toast.error("Invalid email or password.");
        return { error: "Invalid email or password." };
      } else if (error.code === 429) {
        toast.error("Too many requests. Please try after some time");
        return { error: "Invalid email or password." };
      } else {
        console.error("User sign in error:", error.message);
        return { error: error.message };
      }
    } else {
      console.error("An unexpected error occurred:", error);
      return { error: "An unexpected error occurred." };
    }
  }
}

// Log out user
export async function logOutUserAccount() {
  try {
    const session = await account.deleteSession('current')
    return session
  } catch (error) {
    console.log(error)
  }
}
// GET current user account
export async function getCurrentUserAccount() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      console.warn('User not logged in or session expired.');
      return null; // Indicate that no user is logged in
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0) {
      console.warn('User document not found in database.');
      return null; // Indicate that the user document was not found
    }

    return currentUser.documents[0];
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 401) {
      console.warn("User not logged in or session expired.");
      return null;
    }
    console.error("Error in getCurrentUserAccount:", error);
    return null;
  }
}

// CREATE new post -- supports multiple files uploads too
export async function createPost(post: INewPost) {
  try {
    // Upload Media File
    const uploadedFiles = await Promise.all(post.file.map(uploadFile))

    if (uploadedFiles.some(file => !file)) throw Error("Some files couldn't be uploaded!")

    // get fileUrl
    const fileUrls = await Promise.all(
      uploadedFiles.map(file => getFilePreview(file.$id))
    )

    if (fileUrls.some(urls => !urls)) {
      await Promise.all(uploadedFiles.map(file => deleteFile(file.$id)))
      throw Error
    }

    // converting tags into array
    const tags = post.tags?.replace(/ /g, '').split(",") || []
    const postValues = {
      creator: post.userId,
      caption: post.caption,
      imageUrl: fileUrls,
      imageId: uploadedFiles.map(file => file.$id),
      location: post.location,
      tags: tags
    }

    console.log(postValues)

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      postValues
    )

    if (!newPost) {
      await Promise.all(uploadedFiles.map(f => deleteFile(f.$id)));
      throw Error
    }

    return newPost

  } catch (error) {
    console.log(error)
  }
}

// UPLOAD image to appwrite storage
export async function uploadFile(imageFile: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      imageFile
    )
    return uploadedFile
  } catch (error) {
    console.log(error)
  }
}

// GET file preview of the image
export async function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    )

    return fileUrl
  } catch (error) {
    console.log(error)
  }
}

// DELETE a file from storage
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)

    return {
      status: "ok"
    }
  } catch (error) {
    console.log(error)
  }
}