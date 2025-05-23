import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { UseMutateFunction } from '@tanstack/react-query'
import { IUser } from '@/types'
import ProfileIcon from './ProfileIcon'
import DarkModeSwitcher from './DarkModeSwitcher'

function ProfileMenu({ logOut, user }: { logOut: UseMutateFunction, user: IUser }) {
  return (
    <DropdownMenu>
      {/* trigger */}
      <DropdownMenuTrigger>
        <div >
          {
            user.id ? <img src='https://cloud.appwrite.io/v1/avatars/initials?name=Abhishek&project=67efbbf3003c17261104' className='rounded-full size-8' alt={`${user.name} profile`} /> : < ProfileIcon />
          }
        </div>
      </DropdownMenuTrigger>

      {/* menu content */}
      <DropdownMenuContent className='dark:bg-black *:hover:bg-none mr-2 rounded-0 w-40 *:hover:font-medium'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          {
            <DarkModeSwitcher />
          }</DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* log out button */}
        <DropdownMenuItem className='flex hover:bg-none w-full'>
          <button
            className='dark:hover:bg-[rgba(256,0,0,0.1)] dark:active:bg-[rgba(256,0,0,0.6)] m-0 border-[rgba(250,0,0,0.6)] w-full hover:font-normal'
            onClick={() => logOut()}>
            Log out
          </button>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default ProfileMenu