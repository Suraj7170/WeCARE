'use client'
import { Button } from '@/components/ui/button'
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


function Header() {
    const Menu =[
        {
            id:1,
            name:'Home',
            path:'/'
        },
        {
            id:2,
            name:'Explore',
            path:'/Search/Dentist'
        },
        {
            id:3,
            name:'Contact Us',
            path:'/Contact Us'
        }
    ]

    const {user}= useKindeBrowserClient();

    useEffect(() => {
        console.log(user);
    }, [user]);
  return (
    <div className='flex justify-between items-center p-5 bg-white shadow-md'>
        <div className='flex items-center gap-10'>
         <Link href='/' className='cursor-pointer'><Image src='/logo.svg' alt='logo' width={100} height={100} /> </Link>

         <ul className='md:flex gap-8 hidden'>
            {Menu.map((item,index)=>(
                <Link key={index} href={item.path}>
                <li key={index} className='hover:caret-blue-600 cursor-pointer
                hover:scale-105 transition-all ease-in-out'>{item.name} </li>
                </Link>
            ))}
         </ul>
         </div>
         {user?
            <Popover>
                <PopoverTrigger>
                    <Image src={user?.picture} alt='profile-image' width={50} height={50}
                    className='rounded-full'/>
                </PopoverTrigger>
                <PopoverContent className="w-40 font-semibold transition-all ease-in-out hover:cursor-pointer">
                    <ul className='flex flex-col gap-1'>
                        <li className='hover:bg-slate-100 p-2 rounded-md'>Profile</li>
                        <Link href={'/my-booking'} className='hover:bg-slate-100 p-2 rounded-md'>Appointments</Link>
                        <li className='hover:bg-slate-100 p-2 rounded-md'><LogoutLink>Log out</LogoutLink></li>
                    </ul>
                </PopoverContent>
            </Popover>

            :
            <LoginLink postLoginRedirectURL="/"><Button className='cursor-pointer'>Sign in </Button></LoginLink>
         }
         
         
    </div>
  )
}

export default Header