"use client";

import { CarProps, MovieProps } from '@types';
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useState } from 'react';
import CustomButton from './CustomButton';
import MovieDetails from './MovieDetails';
import { useSession, getProviders, ClientSafeProvider } from 'next-auth/react';

interface MovieCardProps {
  movie: MovieProps;
}

const MovieCard = ({movie} : MovieCardProps) => {
  const { data: session }         = useSession();
  const { update: sessionUpdate } = useSession();
  const [isSaved, setIsSaved]     = useState(false)
  const [isOpen, setIsOpen]       = useState(false);

  const {title,releaseYear,genres,rating,runtime,imageSet} = movie;


  useEffect(() => {
    let tepm = session && session.user.savedMovies.includes(movie.id)
    setIsSaved(tepm !== null ? tepm : false)
  },[session])


  async function deleteMovie(){
    if(session){
      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          movieID: movie.id,
          remove: true
        })
      })
      let newUser = await response.json()
      session.user = newUser
      await sessionUpdate({ ...session?.user, id: newUser._id.toString() });
      console.log(session);
    }
  }
  async function saveMovie(){
    if(session){
      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          movieID: movie.id,
        })
      })
      let newUser = await response.json()
      session.user = newUser
      await sessionUpdate({ ...session?.user, id: newUser._id.toString() });
      console.log(session);
    }
    // fetchMovieById(session?.user?.id )
  }



  return (
    <div className='car-card group' id={movie.id}>
      <div className='car-card__content'>
        
        <h2 className='font-extrabold text-xl'>
          {title}
        </h2>
        { session && session.user && (
          <div className='heart_icon'>
          { isSaved ? <CustomButton
            title=""
            containerStyles='w-8 h-8 p-2 rounded-full bg-red-200 opacity-9 hover:bg-rose-100' 
            btnType={'button'}
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/heart-white.svg"
            handleClick={deleteMovie}  
            rightIconStyles="w-2.5 h-2.5"     
            /> : <CustomButton
            title=""
            containerStyles='bg-sky-100 w-8 h-8  p-2 rounded-full opacity-9 hover:bg-rose-100' 
            btnType={'button'}
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/heart-white.svg"
            handleClick={saveMovie}     
            rightIconStyles="w-2.5 h-2.5"   
            />}
        </div>
        )}
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
      <div className='relative w-full h-40 my-3 object-contain shadow-lg '>
        <Image 
          src={imageSet.horizontalPoster.w720}
          alt="car model"
          fill priority
          sizes='100vw'
          className='object-fill shadow-lg '
        />
      </div>
      <div className='relative flex w-full mt-2 icons_container'>
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
            containerStyles='w-full p-2 rounded-full bg-slate-600 opacity-[0.7]' 
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

export default MovieCard