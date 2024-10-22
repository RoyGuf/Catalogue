"use client";

import { SearchGenreProps } from '@types'
import React from 'react'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxButton, Transition } from '@headlessui/react'
import Image from 'next/image';
import { useState, Fragment } from 'react';
import { genres } from '@constants';

const SearchManufacturer = ({genre, setGenre}: SearchGenreProps ) => {
  const [query, setQuery] = useState('');

  const filteredGenres = query === "" ?
  genres : genres.filter((genre) => (
      genre.name.toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""))
    ))

  return (
    <div className='search-manufacturer'>
      <Combobox value={genre} onChange={setGenre}>
        <div className='relative w-full'>
          <ComboboxButton className="absolute top-[14px]">
            <Image 
            src="/car-logo.svg"
            width={20}
            height={20}
            className="ml-4"
            alt="Car Logo"
            />
          </ComboboxButton>
          <ComboboxInput
            className="search-manufacturer__input"
            placeholder='Romance'
            displayValue={(genre: string) => genre}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
          >
            <ComboboxOptions className='absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              static>
              { filteredGenres.map((item) => (
                <ComboboxOption
                  key={item.id}
                  value={item.id}
                  className={({active}) => 
                    `relative search-manufacturers__option 
                  ${active ? 'bg-primary-blue text-white' 
                    : 'text-gray-900'}`}>
                  {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item.name}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-pribg-primary-purple"}`}
                          ></span>
                        ) : null}
                      </>
                    )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

// filteredGenres.length === 0 && query != "" ? (
//   <Combobox.Option
//     value={query}
//     className="search-manufacturers__option"
//   >
//     Create "{query}"
//   </Combobox.Option>
// ) :

export default SearchManufacturer