import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";
import { INewUser } from "@/types";


//Create User
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
    console.log("Session:", session)
    return session
  } catch (error) {
    console.log("User sign in error")
    console.log(error)
  }
}

// // Get Current Account 
// export async function getCurrentUserAccount() {
//   try {
//     // Appwrite writes the cookie to Session Storage automatically.
//     // account.get() takes that cookie and returns the account details
//     const currentAccount = await account.get()
//     if (!currentAccount) throw Error
//     const currentUser = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.usersCollectionId,
//       [Query.equal('accountId', currentAccount.$id)]
//     )
//     if (!currentUser) throw Error;
//     return currentUser.documents[0]
//   } catch (error) {
//     console.log(error)
//   }
// }


/**
 * 
 *{
    "message": "User (role: guests) missing scope (account)",
    "code": 401,
    "type": "general_unauthorized_scope",
    "version": "1.6.2"
}
 */
export async function getCurrentUserAccount() {
  try {
    const session = await account.getSession('current');
    if (!session) throw new Error('No active session');

    const currentAccount = await account.get();
    if (!currentAccount) throw new Error('No account found');

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) throw new Error('User document not found');

    return currentUser.documents[0];
  } catch (error) {
    console.log('Error in getCurrentUserAccount:', error);
    return null;
  }
}