"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { ShowMoreProps } from '@types'
import CustomButton from './CustomButton'
import { updateSearchParams } from '@utils'

const ShowMore = ({pageNumber, isNext, nextCursor, cursor } : ShowMoreProps) => {
  const router = useRouter();
  const handleNavigation = () => {
    const newPathName = updateSearchParams("cursor", nextCursor);
    const element     = document.getElementById("discover")
    router.push(newPathName, {scroll: false});
    element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
  }
  return (
    <div className={`flex-center gap-5 mt-10 mx-2 md:w-1/3 w-full ${cursor && cursor !== "" ? "w-full" : "lg:w-full"}`} >
      {isNext && (
        <CustomButton
          title='Show more'
          btnType='button'
          containerStyles='bg-sky-600 rounded-full text-white'
          handleClick={handleNavigation}
          >
        </CustomButton>
      )}
    </div>
  )
}

export default ShowMore