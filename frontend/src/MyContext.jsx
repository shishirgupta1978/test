import React, { useState,createContext,useContext } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { toast } from "react-toastify";



const BASE_URL = import.meta.env.VITE_BASE_URL;

export const MyContext = createContext();

export const MyProvider= (props)=> {
    const [context, setContext] = useState({'user': localStorage.getItem("Tokens") ? jwt_decode(JSON.parse(localStorage.getItem("Tokens"))?.access) : null});
  
    return (
      <MyContext.Provider value={{ context, setContext }}>
        {props.children}
      </MyContext.Provider>
    );
  }
  
  


export  const axiosApi = (url,config,setData) => {
      setData({'is_loading':true,'is_error':false,'is_success':false,'result':null,'message':null})
      axios(`${BASE_URL}/${url}`, config).then((response)=>{setData({'is_loading':false,'is_error':false,'is_success':true,'result':response.data,'message':null});console.log(response);})
      .catch((error)=>{setData({'is_loading':false,'is_error':true,'is_success':false,'result':null,'message':error});
      console.log(error);
      const message =
      (error.response &&
          error.response.data &&
          error.response.data.message) ||
      error.message ||
      error.toString();
      toast.error(message);

  })
  
  }
  
