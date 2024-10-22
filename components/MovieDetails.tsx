"use client"

import { CarProps, MovieProps } from '@types';
import React from 'react'
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { generateCarImageUrl } from '@utils';

interface MovieDetailsProps {
  isOpen: boolean;
  closeModal : () => void;
  movie: MovieProps
}
const CarDetails = ({isOpen, closeModal, movie} : MovieDetailsProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            >
            <div className='fixed inset-0 bg-black bg-opacity-25'>
            </div>
          </TransitionChild>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
              >
              <DialogPanel className='relative w-full max-2-lg max-h-[90vh] max-w-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                >
                  <Image
                    src="/close.svg"
                    alt="close"
                    width={20} 
                    height={20} 
                    className='object-contain'
                  />
                </button>
                <div className='flex-1 flex flex-col gap-3'>
                  <div className='relative w-full h-40  bg-[#0f6e9936] bg-cover bg-center rounded-lg shadow-sm '>
                  <Image
                    src={movie.imageSet.horizontalPoster.w720}
                    alt="movie model"
                    fill priority
                    sizes='100vw'
                    className='object-contain'
                  />
                  </div>
                  <div className='flex gap-3'>
                    <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg shadow-sm'>
                      {movie.imageSet.verticalPoster && (
                        <Image
                          src={movie.imageSet.verticalPoster?.w360 || ""}
                          alt="movie model"
                          fill priority
                          sizes='100vw'
                          className='object-contain'
                        />
                      )}
                    </div>
                    <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg shadow-sm'>
                    {movie.imageSet.verticalBackdrop && (
                      <Image
                        src={movie.imageSet.verticalBackdrop?.w360 || ""}
                        alt="movie model"
                        fill priority
                        sizes='100vw'
                        className='object-contain'
                      />
                    )}
                    </div>
                    <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg shadow-sm'>
                    {movie.imageSet.horizontalBackdrop && (
                      <Image
                        src={movie.imageSet.horizontalBackdrop?.w360 || ""}
                        alt="movie model"
                        fill priority
                        sizes='100vw'
                        className='object-contain'
                      />
                    )}
                    </div>
                  </div>
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                  <h2 className='font-semibold text-xl capitalize'>
                    {movie.title}
                  </h2>
                  <div className='mt-3 flex flex-wrap gap-4'>
                    {Object.entries(movie).map(([key, value]) => (
                      !Array.isArray(value) && !(typeof value === 'object') ? (
                        <div className='flex justify-between gap-5 w-full text-right shadow-sm' key={key}>
                          <h4 className='text-gray capitalize'>{key.split('_').join(' ')}</h4>
                          <p className='text-black-100 font-semibold capitalize'>{value}</p>
                        </div>
                      ) : key !== "imageSet" && key !== "streamingOptions" && (
                        <div className='flex justify-between gap-5 w-full text-right shadow-sm' key={key}>
                          <h4 className='text-gray capitalize'>{key.split('_').join(' ')}</h4>
                          <span className='break-all'>
                          {Object.entries(value).map(([newKey, newValue]:any) => (
                            <p className='text-black-100 font-semibold capitalize w-full' key={newKey}>{newValue.name ? newValue.name : newValue }</p>
                          ))}
                          </span>
                          
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CarDetails