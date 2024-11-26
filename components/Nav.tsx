"use client"

import React, { Provider } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders, ClientSafeProvider} from 'next-auth/react'



const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
    }, []);
    const signOutTrigger = () => {
      signOut();
    }
    const signInTrigger = () => {
      signIn();
    }
  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link href="" className='flex justify-center items-center'>
          <Image 
          src="/logo.png"
          alt="Car hub logo"
          width={118}
          height={18}
          className='object-contain'
          />
        </Link>
        {/* desktop navigation */}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-2 md:gap-5">
                    <Link href="/"
                        className="custom-btn text-primary-blue bg-white rounded-full min-w-[130px] border-gray-200 border hover:bg-slate-100">
                        Home
                    </Link>
                    <CustomButton
                      title="Sign Out"
                      btnType="button"
                      containerStyles="text-primary-blue bg-white rounded-full min-w-[130px] border-gray-200 border hover:bg-slate-100"
                      handleClick={signOutTrigger}
                    />
                    <Link href="/">
                        <Image
                            src= {session?.user.image || ""}
                            width={40}
                            height={40}
                            className="rounded-full my-1 "
                            alt="profile"
                        />
                    </Link>
                </div>
            ): (
                <>
                {providers && Object.values(providers).map((provider)=> (
                    <CustomButton
                    key={provider.id}
                    title="Sign In"
                    btnType="button"
                    containerStyles="text-primary-blue bg-white rounded-full min-w-[130px] hover:bg-slate-100"
                    handleClick={signInTrigger}
                  />
                ))}
                </>
            )}
        </div>
        {/* mobile navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image
                        src={session?.user.image || ""}
                        width={37}
                        height={37}
                        className="rounded-full cursor-pointer"
                        alt="profile"
                        onClick={() => setToggleDropdown((prev) => !prev)}
                    /> 
                    {toggleDropdown && (
                        <div className="dropdown border-gray-100 border">
                            <Link
                                href="/"
                                className="dropdown_link w-full text-center"
                                onClick={() => setToggleDropdown(false)}>
                                My Profile
                            </Link>
                            <Link
                                href="/"
                                className="dropdown_link w-full text-center"
                                onClick={() => setToggleDropdown(false)}>
                                Home
                            </Link>
                            <CustomButton
                              title="Sign Out"
                              btnType="button"
                              containerStyles="mt-5 w-full bg-primary-blue text-white rounded-full mt-10 hover:bg-black-400"
                              handleClick={() => {
                                setToggleDropdown(false);
                                signOutTrigger();
                              }}
                            />
                        </div>
                    )}
                </div>
                
            ): (
                <>
               {providers && Object.values(providers).map((provider)=> (
                    <CustomButton
                    key={provider.id}
                    title="Sign In"
                    btnType="button"
                    containerStyles="text-primary-blue bg-white rounded-full min-w-[130px] border-gray-100 border hover:bg-slate-100"
                    handleClick={signInTrigger}
                  />
                ))}
                </>
            )}
        </div>
      </nav>
    </header>
  )
}

export default Nav