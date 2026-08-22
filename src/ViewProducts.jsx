import React from 'react';
import axios from 'axios';
import Productcard from './Productcard';
import { useOutletContext,useNavigate } from 'react-router-dom';

const ViewProducts = () => {
 
  const { products,getProducts,API, selectedBrands,
  selectedShapes,selectedCatagory,maxPrice,sortOrder } = useOutletContext();
  const navigate=useNavigate();


{/*Update Product details */}
async function editProducts(id) {
  navigate(`/products/edit/${id}`);  
  }
  {/*Delete Products*/}
   async function deleteProducts(id) {
    console.log("entering delete Products function")
      try{
          await axios.delete(API+"/"+id);
          setMsg(" Product Deleted Successfully");
      }
      catch(err)
      {
        console.log(err);
      }
      getProducts();
    }
//Catagory filter
const catagoryMatchProducts = products.filter((product) => 
      ((selectedCatagory === "" )|| (product.catagory === selectedCatagory)));
//brand filter
const brandMatchProducts = catagoryMatchProducts.filter((product) => 
    ((selectedBrands.length === 0 )|| (selectedBrands.includes(product.brand))));
//shape filter
const shapeMatchProducts = brandMatchProducts.filter((product) => 
   ((selectedShapes.length === 0) ||(selectedShapes.includes(product.shape))));
//
const MatchedProducts = shapeMatchProducts.filter((product) => (product.price <= maxPrice)); 
  console.log(catagoryMatchProducts);
console.log(brandMatchProducts);
console.log(shapeMatchProducts);
if (sortOrder === "price high to low") 
  MatchedProducts.sort((a, b) => b.price - a.price);
if(sortOrder==="price low to high") 
  MatchedProducts.sort((a, b) => a.price - b.price);

  
  return (
    <div>
       <h1 className='font-serif text-blue-900 text-2xl font-bold m-2 p-1'>Our Products</h1>
        <div className='products-display grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
         {  MatchedProducts.map((product)=>(
                  <Productcard key={product.id}
                              product={product}
                              onDelete={deleteProducts}
                              onEdit={editProducts}/>
        ) )}
         </div>
    </div>
  );
}

export default ViewProducts;
