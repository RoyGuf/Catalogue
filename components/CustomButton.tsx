"use client";

import React from 'react'
import Image from 'next/image'
import { title } from 'process';
import { CustomButtonProps } from '@types';

const CustomButton = ({title, handleClick, containerStyles, textStyles, rightIcon, rightIconStyles}: CustomButtonProps) => {
  return (
    <button
        disabled={false}
        type={"button"}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}
    >
        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>
        {rightIcon && (
          <div className={`relative w-6 h-6 ${rightIconStyles}`}>
            <Image
              src={rightIcon}
              alt="right icon"
              fill
              className='object-contain'
            />
          </div>
        )}
    </button>
  )
}

export default CustomButton