import React from 'react';
import { useState } from 'react';
import { Link,Outlet,useLocation } from 'react-router-dom';
import ApplyFilter from './ApplyFilter';
import axios from 'axios';
import { useEffect } from 'react';

const Products = () => {
    const [sideBar, setSideBar]=useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [productPage,setProductPage]=useState(true);
     const [products, setProducts] = useState([]);
     //const API ="http://localhost:3000/products";
      const API="https://react-stampore-project-crudoperations-and-filter-production.up.railway.app/products";
     const location=useLocation();
{/* States to apply filters*/}
const [selectedCatagory, setSelectedCatagory] = useState("");
const [selectedBrands, setSelectedBrands] = useState([]);
const [selectedShapes, setSelectedShapes] = useState([]);
const [maxPrice, setMaxPrice] = useState(4000);
const [sortOrder, setSortOrder] = useState("");

{/* GET PRODUCTS*/ }
     async  function getProducts()
        {
      try  
      {
     const response = await axios.get(API);
     setProducts(response.data);
     console.log("Products loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }
  }
  useEffect(()=>{
    getProducts();
    SideBar();
     
  },[location.pathname] );
  function SideBar()
  {
     if((location.pathname.includes("/products/add"))||(location.pathname.includes("/products/edit")))
      {
         setProductPage(false);
      }
      else
      {
        setProductPage(true);
      }
  }
  return (
    <div className='products-container relative w-screen h-screen bg-white lg:flex flex-row'>
        {
            !sideBar &&(
            <button className='lg:hidden text-2xl bg-transparent ms-0 ps-0 pt-1 pb-1' onClick={()=>setSideBar(true)} >
                    <img className='sidebar-open' src='\icons\sidebar-open.png' height='50px' width='50px'></img>
        </button>
 ) }
        
      <div className='side-bar hidden lg:flex flex-col w-[20%] min-h-screen m-1 p-2 font-serif text-blue-900 border-e-2 border-blue-900'>
       {/* <Link to="/products/add" className="text-xl font-bold p-2 m-1 hover:border-b-2 border-blue-900 hover:shadow-lg hover:rounded-lg focus:border-b-2 border-blue-900" 
        onClick={()=>setProductPage(false)}>Add New Product</Link>
        <Link to="/products"  className="text-xl font-bold p-2 m-1 hover:border-b-2 border-blue-900 hover:shadow-lg hover:rounded-lg focus:border-b-2 border-blue-900">View Products</Link>
      </div>*/}
      {
        productPage && (
            <div>
                <button className= 'm-1 p-1 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900'
          onClick={()=>setProductPage(false)}>
         <Link to="/products/add" className="text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900" >
         Add New Product</Link></button>
          <button  className= ' m-1 p-2 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900' 
        onClick={()=>setShowFilters(!showFilters)}>Apply Filters</button>

           { showFilters && (
            <div className="w-full m-1 p-1 h-screen overflow-y-auto">
                <ApplyFilter  selectedBrands={selectedBrands}
                              setSelectedBrands={setSelectedBrands}
                              selectedShapes={selectedShapes}
                              setSelectedShapes={setSelectedShapes}
                              selectedCatagory={selectedCatagory}
                              setSelectedCatagory={setSelectedCatagory}
                              maxPrice={maxPrice}
                              setMaxPrice={setMaxPrice}
                              sortOrder={sortOrder}
                              setSortOrder={setSortOrder}/>
            </div>
         ) }
         </div>
         )
      }
     {
       !productPage && (
        <div>
            <button className= 'm-1 p-1 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900'
          onClick={()=>setProductPage(true)}>
         <Link to="/products" className="text-xl font-bold p-2 m-1">
         View Products</Link>
         </button>
         </div>
        )   
    }
      </div>
      <div className='products-display w-full lg:flex flex-col w-[80%] h-[100%] m-1 p-4 z-0 text-xl font-bold'>
            <Outlet  context={{products,getProducts,API, 
            selectedBrands, selectedShapes, selectedCatagory, maxPrice, sortOrder}} />
        </div>
    
    {
        ((sideBar)&&(productPage)) && (
        <div className='sidebar-visible w-full sm:w-1/2 fixed top-[12%] left-0 bg-white h-screen p-2 flex flex-col font-serif text-blue-900 z-50'>
            <button className='lg:hidden text-2xl bg-transparent ms-0 ps-0 pt-1 pb-1' onClick={()=>setSideBar(false)} >
                    <img className='sidebar-open' src='\icons\sidebar-close.png' height='50px' width='50px'></img>
        </button>
         <button className= 'm-1 p-1 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900'
          onClick={()=>{setProductPage(false);
            setSideBar(false);
          }}>
            <Link to="/products/add" className="text-xl font-bold p-2 m-1">Add New Product</Link>
         </button>
          <button  className= ' m-1 p-1 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900' 
        onClick={()=>setShowFilters(!showFilters)}>Apply Filters</button>
        {
            showFilters &&
            <div className="w-full m-1 p-1 h-screen overflow-y-auto">
                <ApplyFilter selectedBrands={selectedBrands}
                              setSelectedBrands={setSelectedBrands}
                              selectedShapes={selectedShapes}
                              setSelectedShapes={setSelectedShapes}
                              selectedCataory={selectedCatagory}
                              setSelectedCatagory={setSelectedCatagory}
                              maxPrice={maxPrice}
                              setMaxPrice={setMaxPrice}
                              sortOrder={sortOrder}
                              setSortOrder={setSortOrder}/>
            </div>
        }
        
        </div>)
    }
     {
        ((sideBar)&&(!productPage)) &&(
        <div className='sidebar-visible w-full sm:w-1/2 fixed top-[12%] left-0 bg-white h-screen p-2 flex flex-col font-serif text-blue-900 z-50'>
            <button className='lg:hidden text-2xl bg-transparent ms-0 ps-0 pt-1 pb-1' onClick={()=>setSideBar(false)} >
                    <img className='sidebar-open' src='\icons\sidebar-close.png' height='50px' width='50px'></img>
        </button>
        <button className= 'm-1 p-1 block w-full link-btn bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900'
         onClick={()=>{setProductPage(true);
            setSideBar(false);}
         }>
         <Link to="/products" className="text-xl font-bold p-2 m-1">View Products</Link>
         </button>
       
        </div>
        )
    }
    </div>
  );
}

export default Products;
