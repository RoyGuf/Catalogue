import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async(req, { params }) => {

  try {

      await connectToDB();
      const sessionUser = await User.findById(params.id);

      // const prompts = await Prompt.find({ creator: params.id }).populate("creator")

      return new Response(JSON.stringify(sessionUser), {
          status: 200
      })
  } catch (error) {
      console.log(error);
      return new Response("Failed to fetch all prompts", {
          status: 500
      })
  }
}

export const PATCH = async(req,{params}) => {
  const {movieID, remove} = await req.json();
  try {
      if(remove){
        await connectToDB();
        const existingUser = await User.findById(params.id);
        if(!existingUser) return new Response("User not found", {
          status: 400
        })
        let index  = existingUser.savedMovies.indexOf(movieID)
        existingUser.savedMovies.splice(index, 1)
        await existingUser.save();
        return new Response(JSON.stringify(existingUser), {
            status: 200
        })
      }else{
        await connectToDB();
        const existingUser = await User.findById(params.id);
        if(!existingUser) return new Response("User not found", {
          status: 400
        })
        let movies = existingUser.savedMovies ? (existingUser.savedMovies.indexOf(movieID) < 0 ? 
        [...existingUser.savedMovies, movieID] : existingUser.savedMovies) : [movieID]
        
        existingUser.savedMovies = movies;
        await existingUser.save();
        return new Response(JSON.stringify(existingUser), {
            status: 200
        })
      }
  } catch (error) {
      console.log(error);
      return new Response("Failed to update User", {
          status: 500
      })
  }
}