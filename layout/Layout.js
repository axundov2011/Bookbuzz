import Header from "@/components/layout/Header";
import React, { Children } from "react";


const Layout = ({Children}) => {
  return
   <>
   <Header/>
   {Children}
   </>
}
export default Layout;
