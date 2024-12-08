'use strict';
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { fetchMovieById } from '@utils'


const Profile = ({ name, desc, data}) => {
  const [movies, setMovies] = useState([])
  useEffect( () =>{
    console.log(data);
    
    async function getMovies(){
      let arr = []
      return Promise.all(data.map(async(movieID) => 
        await fetchMovieById(movieID)
        .then(movie => arr.push(movie))
      )).then(() => {setMovies(arr)});
    }
    getMovies()
  },[data.length])
  return (
    <div className=" padding-x py-48 max-width bg-sky-200  rounded-xl shadow-inner lg:mt-10">
        <div className="home__text-container p-8 bg-white rounded-xl shadow-md">
          <div className="w-full">
            <h1 className="head_text text-left">
              <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="desc text-left">
              {desc}
            </p>
            {movies.length ? <div className='home__cars-wrapper ease-in-out'>
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id}/>
              ))}
            </div> : 
            <div className="text-center text-gray-400 p-10">Loading you favorite Movies . . .</div>}
          </div>
        </div>
      </div>
    
  )
}

export default Profile