import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { UseMutateFunction } from '@tanstack/react-query'
import { IUser } from '@/types'
import ProfileIcon from './ProfileIcon'

function ProfileMenu({ logOut, user }: { logOut: UseMutateFunction, user: IUser }) {
  return (
    <DropdownMenu>
      {/* trigger */}
      <DropdownMenuTrigger>
        <div >
          {
            user.id ? <img src='https://cloud.appwrite.io/v1/avatars/initials?name=Abhishek&project=67efbbf3003c17261104' className='size-8 rounded-full' alt={`${user.name} profile`} /> : < ProfileIcon />
          }
        </div>
      </DropdownMenuTrigger>

      {/* menu content */}
      <DropdownMenuContent className='w-40 mr-2 *:hover:font-medium'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* log out button */}
        <DropdownMenuItem className='w-full flex'>
          <Button variant={"ghost"} className='flex-1 text-red-500 hover:bg-red-600 hover:text-white' onClick={() => logOut()}>Log out</Button>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenu