import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const AuthProvider = ({children})=>{

const [blogs,setBlogs]=useState();
const [profile,setProfile] = useState();


const [isAuthenticated,setIsAuthenticated] = useState(false);

 useEffect(() => {
        const fetchProfile = async () => {
      try {
        // token should be let type variable because its value will change in every login. (in backend also)
       // let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
        //console.log(token);
        const token= Cookies.get("token");
        const parsedToken=token?JSON.parse(token):undefined
        if (parsedToken) {
          const { data } = await axios.get(
            "http://localhost:5000/api/users/my-profile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

  const fetchBlogs =async()=>{
    try {
      const {data} =await axios.get("http://localhost:5000/api/blogs/all-blogs");
      console.log(data);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchBlogs();
  fetchProfile();
},[])

  return(
    <AuthContext.Provider value={{blogs,profile,setProfile,isAuthenticated, setIsAuthenticated}}>{children}</AuthContext.Provider>
  )
};

export const useAuth=()=>useContext(AuthContext);