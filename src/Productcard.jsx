import React, { useState} from 'react';

const Productcard = ({product,onDelete,onEdit}) => {
  const [currentImage, setCurrentImage]=useState(product.productImage);
  function changeImage()
  {
    if (currentImage==product.productImage)
    setCurrentImage(product.sealImage);
  else
    setCurrentImage(product.productImage);
  }
  return (
    <div className=' rounded-lg shadow-lg m-1 p-4 w-full max-w-[400px] h-[600px] bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100'>
         <div className="bg-white/30 backdrop-blur-md grid grid-rows-[auto_1fr_auto_auto_auto] m-1 p-3 h-[auto] rounded-lg shadow-lg">
      <div className='flex justify-center items-center w-full h-64'>
        <img className='product-image rounded-lg shadow-lg w-full h-full m-1 object-contain' src={currentImage} alt={product.name} width="200px" height="200px" onClick={()=>{changeImage();}} />
      </div>
      <div className='product-title font-serif font-bold text-blue-900 text-2xl m-1 p-2'><h1>{product.name}</h1></div>
      <div className='product-dimension font-serif font-semibold text-blue-900 text-xl m-1 p-1'><h1>{product.dimension}</h1></div>
      <div className='product-price font-serif font-bold text-red-900 text-2xl m-1 p-1'><h1>{product.price}</h1></div>
      <div className='flex flex-row'>
      <button className="bg-blue-900 text-white font-serif font-bold p-2 m-4 rounded-lg hover:shadow-lg hover:bg-green-700" onClick={()=>onEdit(product.id)} >
        Update
      </button>
       <button className="bg-blue-900 text-white font-serif font-bold p-2 m-4 rounded-lg hover:shadow-lg hover:bg-red-500" onClick={()=>{onDelete(product.id);}}>
        Delete
      </button>
      </div>
    </div>
    
    </div>
  );
}

export default Productcard;
