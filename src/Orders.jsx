import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders]=useState([]);
  const OrderAPI="http://localhost:3000/orders";
    const navigate=useNavigate();
useEffect(()=>
{
  getOrders();
},[]);
async function getOrders()
{
    try  
      {
     const response = await axios.get(OrderAPI);
     setOrders(response.data);
     console.log("Orders loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }
  }

  function getStatusDesign(status) {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-700 hover:bg-green-200 rounded-lg shadow-lg";

        case "processing":
            return "bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg shadow-lg";

        case "cancelled":
            return "bg-red-100 text-red-700 hover:bg-red-200 rounded-lg shadow-lg";

        default:
            return "bg-white  hover:bg-gray-100 rounded-lg shadow-lg";
    }
}

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-serif font-black text-xl lg:text-4xl text-blue-900 mt-3 text-center">Customer Information</h1>
      <table className="w-full text-blue-900 my-5 p-3">
        <thead className=" bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 text-center lg:text-xl text-xs p-1 lg:p-8 h-[30px] w-full">
        <tr>
          <th className="p-4">Order Date</th>
          <th className="p-4">Order Status</th>
          <th className="p-4">Total Amount</th> 
          <th className="p-4">Payment Status</th> 
          <th className="p-4">Payment Mode</th> 
        </tr>
        </thead>
        <tbody>
          { orders.map((order)=>(
              <tr key={order.id} 
              className= "odd:bg-white even:bg-yellow-50 hover:bg-teal-50 cursor-pointer" 
              onClick={()=>navigate(`/orders/details/${order.id}`)}>
                <td className="p-4 font-normal hover:font-semibold text-center">{order.orderDate}</td>
                <td className="p-4 font-normal hover:font-semibold text-center"><p className={`${getStatusDesign(order.status)} my-1 px-4 py-2 font-normal hover:font-semibold `}>{order.status}</p></td>
                <td className="p-4 font-normal hover:font-semibold text-center">{order.totalAmount}</td>
                <td className="p-4 font-normal hover:font-semibold text-center ">{order.payment}</td>
                <td className="p-4 font-normal hover:font-semibold text-center">{order.paymentmode}</td>
              </tr> 
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
