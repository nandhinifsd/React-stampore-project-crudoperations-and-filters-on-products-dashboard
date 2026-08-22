import react from 'react';
import Navbar from './Navbar';
import Products from './Products';
import Home from './Home';
import Customers from './Customers';
import Addform from './Addform';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import ViewProducts from './ViewProducts';
import CustomerDetails from './CustomerDetails';
import Footer from './Footer';


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
      
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/details/:id" element={<CustomerDetails />} />
    
     </Routes>
   <Footer />

    </>
  )
}

export default App
