import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const [customers, setCustomers]=useState([]);
  const customerAPI="https://striking-comfort-production-2d21.up.railway.app/customers";
    const navigate=useNavigate();
useEffect(()=>
{
  getCustomers();
},[]);
async function getCustomers()
{
    try  
      {
     const response = await axios.get(customerAPI);
     setCustomers(response.data);
     console.log("Customers loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }
  }


  return (
    <div>
      <h1 className="font-serif font-black text-xl lg:text-4xl text-blue-900 mt-3 text-center">Customer Information</h1>
      <table className="w-full text-blue-900 my-5 p-3">
        <thead className=" bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 text-center lg:text-xl text-sm p-8 h-[30px]">
        <tr>
          <th className="p-4">Customer Name</th>
          <th className="p-4">Customer Phone Number</th>
          <th className="p-4"> Customer Email ID</th> 
        </tr>
        </thead>
        <tbody>
          { customers.map((customer)=>(
              <tr key={customer.id} 
              className= "odd:bg-white even:bg-yellow-50 hover:bg-teal-50 cursor-pointer" 
              onClick={()=>navigate(`/customers/details/${customer.id}`)}>
                <th className="p-4 font-normal hover:font-semibold">{customer.name}</th>
                <th className="p-4 font-normal hover:font-semibold">{customer.phone}</th>
                <th className="p-4 font-normal hover:font-semibold">{customer.email}</th>
              </tr> 
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
