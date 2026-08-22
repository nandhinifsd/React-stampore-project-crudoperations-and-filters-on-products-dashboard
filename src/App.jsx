import { useState } from 'react'
import Navbar from './Navbar'
import Products from './Products'
import Orders from './Orders'
import Home from './Home'
import Customers from './Customers'
import Addform from './Addform'
import './App.css'
import { Routes,Route } from 'react-router-dom';
import ViewProducts from './ViewProducts'

function App() {
  

  return (
    <>
    <Navbar />
    
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />}> 
      <Route index element={<ViewProducts />} />
      <Route path="add" element={<Addform />} />
      <Route path="edit/:id" element={<Addform />} /></Route>
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
     </Routes>
   

    </>
  )
}

export default App
