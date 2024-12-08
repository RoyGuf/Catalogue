"use client";

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const {data: session} = useSession();
    const [savedMovies, setSavedMovies] = useState([]);
    const router = useRouter();
    // console.log(session);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const data  = await fetch(`/api/users/${session?.user.id}`);
            const user  = await data.json();

            setSavedMovies(user.savedMovies);
        }
        if(session?.user.id) fetchPosts();
    },[session])

    // const handleEdit = (post) => {
    //     router.push(`/update-prompt?id=${post._id}`)
    // }
    // const handleDelete = async (post) => {
    //     const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    //     if(hasConfirmed) {
    //         try {
    //             await fetch(`/api/prompt/${post._id.toString()}`, {
    //                 method: 'DELETE'
    //             });
    //             const filteredPosts = posts.filter((p) => p._id !== post._id);
    //             setPosts(filteredPosts);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }
    return (
        <Profile
            name="My"
            desc="Browse your saved Movies"
            data={savedMovies}
        />
    )
}

export default MyProfile