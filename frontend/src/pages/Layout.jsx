import { Outlet } from "react-router-dom";
import {Navbar} from "../components";


import React from 'react'

export const Layout = () => {
  return (
    <>
       <Navbar/>
       
      <Outlet/>
      
    </>
  )
}
