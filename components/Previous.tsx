"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PreviousProps, ShowMoreProps } from '@types'
import CustomButton from './CustomButton'
import { updateSearchParams, deleteSearchParams } from '@utils'

const Previous = ({cursor } : PreviousProps) => {
  const router = useRouter();
  const handleNavigation = () => {
    const element = document.getElementById("discover")
    router.back();
    element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
  }
  return (
    <div className='flex-center gap-5 mt-10 mx-2 md:w-1/3'>
      {cursor && cursor !== "" && (
        <CustomButton
          title='Previous'
          btnType='button'
          containerStyles='bg-sky-800 rounded-full text-white'
          handleClick={handleNavigation}
          >
        </CustomButton>
      )}
    </div>
  )
}

export default Previous