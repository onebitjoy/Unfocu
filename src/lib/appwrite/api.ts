import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";
import { INewUser } from "@/types";

export async function createUserAccount(user: INewUser) {

  console.log(user.email)
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    )

    if (!newAccount) throw new Error("Account can't be created!")

    const avatarUrl = avatars.getInitials(user.name)

    // saving user to DB
    const newUser = await saveUserToDatabase({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl
    })
    return newUser
  } catch (error) {
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