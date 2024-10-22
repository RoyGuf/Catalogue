"use client";

import React from 'react'
import CustomButton from '@components/CustomButton'
import Image from 'next/image';

const Hero = () => {
  const handleScroll = () => {
    const element = document.getElementById("discover")
    element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
  }
  return (
    <div className='hero'>
        <div className='flex-1 pt-36 padding-x'>
            <h1 className='hero__title'>
                Find a movie you like - quickly and easily!
            </h1>
            <p className='hero__subtitle'>
                Streamline your movie experience with our effortless search process.
            </p>
            <CustomButton
                title="Explore Movies"
                btnType='button'
                containerStyles="bg-sky-600 text-white rounded-full mt-10"
                handleClick={handleScroll}
            />
        </div>
        <div className='hero__image-container bg-'>
            <div className='hero__image'>
                <Image
                    src="/movie.png" 
                    alt="hero"
                    fill
                    className="object-contain"
                />
            </div>
                <div className='hero__image-overlay '>

                </div>
            
        </div>
    </div>
  )
}

export default Hero