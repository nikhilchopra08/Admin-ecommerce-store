import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import StoreSwitcher from "./store-switcher"
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { ThemeToggle } from './theme-toggle'

const NavBar = async () => {

    const { userId } = auth();

    if(!userId) {
      redirect("/sign-in")
    }
  
    const stores = await prismadb?.store.findMany({
      where: {
        userId,
      }
    })

  return (
<div className='border-b'>
        <div className='flex items-center h-16 max-w-full'>
            <MainNav className='mx-6' />
        </div>
    </div>
  )
}

export default NavBar