import Image from "next/image";
import { Hero } from "@components";
import CustomFilter from "@components/CustomFilter";
import SearchBar from "@components/SearchBar";
import { fetchCars, fetchMovies } from "@utils";
import MoviesCard from "@components/MoviesCard";
import { fuels, minYearsOfProduction, maxYearsOfProduction } from "@constants";
import ShowMore from "@components/ShowMore";
import { useState } from "react";
import Previous from "@components/Previous";

export default async function Home({ searchParams }: {searchParams:any}) {
  
  const allMovies = await fetchMovies({
    genres: searchParams.genres || "",
    year_max: searchParams.year_max || 2022,
    year_min: searchParams.year_min || 1990,
    keyword: searchParams.keyword || "",
    cursor: searchParams.cursor || "",
  });
  const isDataEmpty = !(typeof allMovies === 'object') || Object.keys(allMovies).length < 1 || !allMovies
  
  return (
    <div className="">
      <main className="overflow-hidden">
      <Hero/>  
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Movie Catalogue
          </h1>
          <p>
            Explore the movies you might like
          </p>
        </div>
        <div className="home__filters">
          <SearchBar/>
          <div className="home__filter-container">
            <CustomFilter title="year_max" options={maxYearsOfProduction}/>
            <CustomFilter title="year_min" options={minYearsOfProduction}/>
          </div>
        </div>
        
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {/* {allCars?.map((car) => (
                <CarCard car={car}/>
              ))} */}
              {allMovies.shows?.map((movie: any) => (
                <MoviesCard movie={movie}/>
              ))}
            </div>

            <div className="flex justify-center flex-center flex-wrap flex-row-reverse">
              <ShowMore 
                pageNumber={(searchParams.limit || 10) / 10}
                isNext={allMovies.hasMore}
                nextCursor={allMovies.nextCursor }
              />
              <Previous 
                cursor={searchParams.cursor}
              />
              
            </div>
          </section>
        ): (
          <div className="home__error-container">
            <h2 className="text-black text-xl">Oops, no results</h2>
            <p>{allMovies?.error}</p>
          </div>
        )}

      </div>
      </main>
    </div>
  );
}
