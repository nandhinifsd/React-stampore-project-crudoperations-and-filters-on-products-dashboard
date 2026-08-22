import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useOutletContext,useNavigate,useParams } from 'react-router-dom';

const Addform = () => {
  const {  API } = useOutletContext();
  const navigate = useNavigate();
const { id: editId } = useParams();

          const [name, setName] = useState("");
          const [catagory, setCatagory]=useState("");
          const[brand,setBrand]=useState("");
          const[dimension1,setDimension1]=useState("");
          const[dimension2,setDimension2]=useState("");
          const [shape, setShape] = useState("");
          const [productImage, setProductImage] = useState("");
          const [sealImage, setSealImage] = useState("");
          const [price, setPrice] = useState("");
          const [id, setId] = useState("");
          const [msg,setMsg]=useState("");
          const [buttonname,setButtonName]=useState("Add Product");

 async function addProduct(e) {
  e.preventDefault();
  let dimension="";
  if(shape=="Round")
    dimension=dimension1+" mm";
  else
   dimension=dimension1+"mm x "+dimension2+"mm";
    let product = {
      id,name,catagory,brand,shape,dimension,price,productImage,sealImage
    };
    try{
      if (id == "") {
          await axios.post(API,product);
          console.log()
         setMsg("New Product Added Successfully");
        
      
      }
      else {
       await axios.put( API+"/"+id,product);
       setMsg(" Product Updated Successfully");
    
    }
  
  navigate("/products");
  
  }
    catch (err)
    {
      console.log(err);
      setMsg("error Occured. Try again")
    }

    
  }
 useEffect(() => {

  if (editId) {
    getProductById(editId);
  }

}, [editId]);

async function getProductById(id) {

  try {

    const response = await axios.get(`${API}/${id}`);
    const product = response.data;

    setId(product.id);
    setName(product.name);
    setBrand(product.brand);
    setCatagory(product.catagory);
    setShape(product.shape);
    setProductImage(product.productImage);
    setSealImage(product.sealImage);
    setButtonName("Update Product");
    if(product.dimension.length==11)
    {
      setDimension1(product.dimension.slice(0,2));
    setDimension2(product.dimension.slice(7,9));
    }
    else
    {
      setDimension1(product.dimension.slice(0,2));
      setDimension2("--");
    }
    setPrice(product.price);

  } catch (err) {

    console.error("Error loading product:", err);

  }
}


  return (
    <div className='w-full font-serif  font-light text-blue-900 m-1 p-2 flex flex-col justify-evenly'>
       <h1 className='font-bold m-1 p-1 font-lg'> New Product Details </h1>
      <form onSubmit= {addProduct}>
        <label htmlFor='name' className='font-light text-blue-900 font-md m-1 p-2'>Product Name</label>
       <input
            placeholder="enter the productname"
            className="w-full p-2 m-2 rounded-lg border broder-blue-900 shadow-lg  text-sm"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor='catagory' className='font-light text-blue-900 font-md m-1 p-2'>Catagory</label>
          <select id='catagory'
            name='catagory'
            value={catagory}
            onChange={(e)=>setCatagory(e.target.value)}
             className="w-full p-2 m-2 rounded-lg border broder-blue-900 shadow-lg  text-sm">
                <option value="">Select Catagory</option>
                 <option value="Pre Inked Stamps">Pre-Inked Stamps</option>
                 <option value="Self Inking Stamps">Self Inking Stamps</option>
                 <option value="Certificate Stamps">Certificate Stamps</option>
                  <option value="Date Stamps">Date Stamps</option>
                 <option value="Embossed Stamps">Embossed Stamps</option>
                 <option value="Stock Stamps">Stock Stamps</option>
                <option value="Traditional Stamps">Traditional Stamps</option>
                 <option value="Inks and Stamppads">Inks and Stamppads</option>
             </select>
             <br />
             <div className='brand-shape-container w-full flex flex-col md:flex-row justify-between items-center-safe'>
              <div className='block'>
              <label htmlFor='brand' className='font-light text-blue-900 font-md m-1 p-2'>Brand</label>
          <select id='brand'
            name='brand'
            value={brand}
            onChange={(e)=>setBrand(e.target.value)}
             className="w-full md:w-200px m-2 p-2 rounded-lg border broder-blue-900 shadow-lg  text-sm">
                <option value="">Select Brand</option>
                 <option value="Shiny">Shiny Stamps</option>
                 <option value="Trodat">Trodat stamps</option>
                 <option value="Sun-Stamper">SunStamper Stamps</option>
                  <option value="Ecomax">Ecomax Stamps</option>
                  <option value="Neo">Neo Stamps</option>
                  <option value="Stampora">Stampora Stamps</option>
               
             </select>
             </div>
             <div className='block'>
              <label htmlFor='shape' className='font-light text-blue-900 font-md m-1 p-2'>Shape</label>
          <select id='shape'
            name='shape'
            value={shape}
            onChange={(e)=>setShape(e.target.value)}
             className="w-full md:w-200px p-2 m-2  rounded-lg border broder-blue-900 shadow-lg  text-sm gap-50px">
                <option value="">Select Shape</option>
                 <option value="Round">Round Stamps</option>
                 <option value="Oval">Oval Stamps</option>
                 <option value="Square">Square Stamps</option>
                  <option value="Rectangle">Rectangle Stamps</option>
               
             </select>
             </div>
             
             
            <div className='block'>
              
              <label htmlFor='dimension' className='font-light text-blue-900 font-md m-1 p-2'>Dimension</label>
              <div className='w-full flex flex-row justify-around items-center'>
               <input
            placeholder="mm"
            className="xs:w-[25px] lg:w-[70px] p-2 m-2 rounded-lg border broder-blue-900 shadow-lg  text-sm"
            type="number"
            name="dimension1"
            id="dimension1"
            value={dimension1}
            onChange={(e) => setDimension1(e.target.value)}
          />
          <span className="font-normal text-blue-900 m-2 p-2">X</span>
          <span>
             <input
            placeholder="mm"
            className="xs:w-[25px] lg:w-[70px] p-2 m-2 rounded-lg border broder-blue-900 shadow-lg  text-sm"
            type="number"
            name="dimension2"
            id="dimension2"
            value={dimension2}
            onChange={(e) => setDimension2(e.target.value)}
          />
          </span></div>
          </div>
          <div className='block'>
           <label htmlFor='price' className='font-light text-blue-900 font-md m-2 p-2'>Price</label>
       <input
            placeholder="enter the Product Price"
            className="w-full p-2 m-2 rounded-lg border broder-blue-900 shadow-lg  text-sm"
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          </div>

          </div>
          <br />
          
  <label
    htmlFor="productImage"
    className="font-light text-blue-900 m-1 p-2 font-md"
  >
    Product Image URL
  </label>

  <input
    type="text"
    id="productImage"
    name="productImage"
    value={productImage}
    onChange={(e) => setProductImage(e.target.value)}
    placeholder="Enter image URL"
    className="w-full p-2 m-2 rounded-lg border border-blue-900 shadow-lg text-sm"
  />
<br />


  <label
    htmlFor="sealImage"
    className="font-light text-blue-900 m-1 p-2 font-md"
  >
    Seal Image URL
  </label>

  <input
    type="text"
    id="sealImage"
    name="sealImage"
    value={sealImage}
    onChange={(e) => setSealImage(e.target.value)}
    placeholder="Enter image URL"
    className="w-full p-2 m-2 rounded-lg border border-blue-900 shadow-lg text-sm"
  />
<br />
<div className="w-full flex justify-center mt-4">
<button
  type="submit"
  className="w-1/3 md:w-auto px-6 py-2 m-2 rounded-lg bg-blue-900 text-white font-semibold shadow-lg hover:bg-blue-800 transition duration-200"
>
  {buttonname}
</button></div>
<div className='message font-bold text-green-700 font-md m-1 p-2 text-center'>
  <p>{msg}</p>
</div>
</form>
</div>   
  );
}

export default Addform;
