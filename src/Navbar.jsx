import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import { useState } from 'react';


const Navbar = () => {
    const[isOpen,setIsOpen]=useState(false);
    const location=useLocation();
  function getLinkClass(path) 
  {
  let isActive=false;

  if ((path === "/") &&(location.pathname===path)) {
    isActive = true;
  } else if((path !== "/") && (location.pathname.startsWith(path)) ) {
    isActive = true;
  }

  if (isActive) {
    return "px-2 py-2 my-2 text-blue-700";
  } else {
    return "px-2 py-2 my-2 text-blue-900";
  }
};
  return (
    <div>
        <nav className='navbar-container flex flex-row  w-screen h-auto py-2 px-4 bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 justify-between'>
      <div className='heading-container flex flex-row w-2xl px-2 py-1 justify-between'>
        <img className='logo-img' src='/icons/logo.png' alt='Logo Image' width="100px" height="50px" />
            <h1 className='title-txt hidden lg:flex  lg:text-4xl font-serif bg-gradient-to-r from-blue-950 to-indigo-600 bg-clip-text text-transparent py-2 px-1 my-2 mx-3 font-black'>STAMPORA DASHBOARD</h1>
                </div>
                <div className='link-container hidden md:flex flex-column w-sm ps-4 pe-1 py-1 gap-2 text-xl font-bold font-serif text-blue-900'>
                        <Link className={getLinkClass("/")} to="/">Home</Link>
                        <Link className={getLinkClass("/products")} to="/products">Products</Link>
                        <Link className={getLinkClass("/customers")} to="/customers">Customers</Link>
                        
                </div>
                <button className='md:hidden text-2xl bg-transparent p-2' onClick={()=>setIsOpen(!isOpen)} >
                    <img className='hamburger-icon' src='\icons\menu.png' height='50px' width='50px'></img>
                </button>
                 </nav>
                {
                    isOpen &&
                    <div className='menu md:hidden flex flex-col mt-0 p-1 w-screen border text-blue-900 font-bold'>
                       <button  className= ' m-0.5 p-1 block w-full link-btn  bg-white' onClick={()=>setIsOpen(!isOpen)}> <Link to="/">Login</Link></button> 
                       <button  className= ' m-0.5 p-1 block w-full link-btn  bg-white' onClick={()=>setIsOpen(!isOpen)}> <Link to="/products">Products</Link></button> 
                       <button  className= ' m-0.5 p-1 block link-btn bg-white' onClick={()=>setIsOpen(!isOpen)}> <Link className=' ' to="/customers ">Customers</Link></button> 
                        
                </div>

                }
   </div>
  );
}

export default Navbar;
