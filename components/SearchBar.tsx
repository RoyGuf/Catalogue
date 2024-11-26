"use client";

import React, { useState } from 'react'
import SearchGenre from './SearchGenre';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchButton = ({ otherClasses }:{otherClasses: string}) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image 
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)
const SearchBar = () => {
  // const loading = false;
  // const [loading, setLoading] = useState(false)
  const [genre, setGenre] = useState('')
  const [keyword, setKeyword] = useState('')

  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((!genre || genre.trim() === "") && keyword.trim() === "") {
      return alert("Please provide some input");
    };
    updateSearchParams(genre.toLowerCase(), keyword.toLowerCase());

  };

  const updateSearchParams = (genre: string, keyword: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    // Update or delete the 'genres' search parameter based on the 'genres' value
    if (genre) {
      searchParams.set("genres", genre);
    } else {
      searchParams.delete("genres");
    }
    // Update or delete the 'keyword' search parameter based on the 'keyword' value
    if (keyword) {
      searchParams.set("keyword", keyword);
    } else {
       searchParams.delete("keyword");
    }
    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname, {scroll: false});
  };
  return (
    <form className='searchbar' onSubmit={(e) => {
      // setLoading(true);
      handleSearch(e);
      // setLoading(false);
    }}>
      <div className='searchbar__item'>
        <SearchGenre
          genre={genre}
          setGenre={setGenre}
        />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <div className='searchbar__item'>
        <Image
          src="/category.svg"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input 
          type="text"
          name="model"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Marvel'
          className='searchbar__input' />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <SearchButton otherClasses="max-sm:hidden"/>
      
    </form>
  )
}

export default SearchBar