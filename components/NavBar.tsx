import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import StoreSwitcher from "./store-switcher"

const NavBar = () => {
  return (
<div className='border-b'>
        <div className='flex items-center h-16 px-4'>
            <StoreSwitcher/>
            <MainNav className='mx-6' />
            <div className='flex items-center ml-auto space-x-4'>
              {/* <ThemeToggle /> */}
                <UserButton afterSignOutUrl='/'/>
            </div>
        </div>
    </div>
  )
}

export default NavBar