"use client";

import { CarProps, MovieProps } from '@types';
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import CustomButton from './CustomButton';
import { calculateCarRent, generateCarImageUrl } from '@utils';
import MovieDetails from './MovieDetails';

interface CarCardProps {
  movie: MovieProps;
}

const CarCard = ({movie} : CarCardProps) => {
  // const {city_mpg,make,model,transmission,drive,year} = car;
  const {title,releaseYear,genres,rating,runtime,imageSet} = movie;

  // const carRent = calculateCarRent(city_mpg, year);
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='car-card group'>
      <div className='car-card__content'>
        <h2 className='font-extrabold text-xl'>
          {title}
        </h2>
      </div>
      <p className='flex mt-6 text-[32px] font-extrabold'>
        <span className='self-start text-[16px] font-medium'>
        Rating:   
        </span>
        &nbsp;&nbsp;{rating}
        <span className='self-start text-[14px] font-medium'>
        ★
        </span>
      </p>
      <div className='relative w-full h-40 my-3 object-contain'>
        <Image 
          src={imageSet.horizontalPoster.w720}
          alt="car model"
          fill priority
          sizes='100vw'
          className='object-contain'
        />
      </div>
      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image
              src="/year.svg"
              width={20} 
              height={20} 
              alt="steering wheel"
            />
            <p className='text-[14px]'>
              {releaseYear}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image
              src="/tire.svg"
              width={20} 
              height={20} 
              alt="tire"
            />
            <span className='text-[14px] break-all'>
              {genres.map((genre) => (
                <p key={genre.id} className='w-full text-center '>{genre.name}</p>
              ))}
            </span>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image
              src="/time.svg"
              width={20} 
              height={20} 
              alt="gas"
            />
            <p className='text-[14px]'>
              Runtime: {runtime}
            </p>
          </div>
        </div>
        <div className='car-card__btn-container'>
          <CustomButton
            title="View More"
            containerStyles='w-full py-[16px] rounded-full bg-sky-600' 
            btnType={'button'}
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}          
            />
        </div>
      </div>

      <MovieDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        movie={movie}
      />
    </div>
  )
}

export default CarCard