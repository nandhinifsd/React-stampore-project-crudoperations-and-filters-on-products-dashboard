import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';

const OrderDetails = () => {

  const { id } =useParams();
      const [customer,setCustomer]=useState({});
      const [order, setOrder]=useState({});
       const [products, setProducts] = useState([]);
       const [status, setStatus] = useState("");
        const [payment, setPayment] = useState("");
        const [paymentmode, setPaymentmode] = useState("");
       const productAPI="http://localhost:3000/products"
      const customerAPI="http://localhost:3000/customers";
      const orderAPI="http://localhost:3000/orders";
  
 async function getOrderDetails()
    {
        try  
      {
        console.log(id)
     const orderresponse = await axios.get(`${orderAPI}/${id}`);
     setOrder(orderresponse.data);
     setStatus(orderresponse.data.status)
     setPayment(orderresponse.data.payment)
     setPaymentmode(orderresponse.data.paymentmode)
     console.log(orderresponse.data);
     console.log(order);
     console.log("Order Details loaded successfully")
     await getCustomerInfo(orderresponse.data.customerId);
      }
      catch(err)
      {
        console.log(err);
      }
    }


     async function getCustomerInfo(customerid)
    {
          try  
      {
        
     const customerresponse = await axios.get(`${customerAPI}/${customerid}`);
     setCustomer(customerresponse.data);
      console.log(customerresponse.data);
     console.log("Customer Details loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }

    }
    async  function getProducts()
        {
      try  
      {
     const response = await axios.get(productAPI);
     setProducts(response.data);
     console.log("Products loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }
  }


      async function updateOrder() {
  try {
    const response = await axios.patch(`${orderAPI}/${id}`, {
      status:status,
      payment:payment,
      paymentmode:paymentmode,
    });

    setOrder(response.data);

    alert("Order updated successfully!");
  } catch (err) {
    console.log(err);
    alert("Failed to update order.");
  }
}
  
  useEffect(()=>
  {
  getOrderDetails();
  
    getProducts();
  },[id]);
  return (
     <>
     {order && (
         <div className="font-serif font-black  text-blue-900 m-2  p-8 ">
         <Link to="/orders" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-md text-white rounded-lg hover:bg-blue-700 transition">
   
       ← Back to Orders</Link><span><h1 className="text-2xl lg:text-4xl lg:m-8 text-center">Order Details</h1></span>
       
       
       <div className="mt-6 flex flex-col md:flex-row 
                      md:items-center md:justify-evenly">
        <div className='flex items-center gap-4'>
          <p className="text-md text-gray-500">
            Order ID:
          </p>
          <span className="text-md font-bold text-blue-900">
            {order.id}
          </span>
        </div>
         <div className='flex items-center gap-4'>
          <p className="text-md text-gray-500">
            Order Date:
          </p>
          <span className="text-md font-bold text-blue-900">
            {order.orderDate}
          </span>
        </div></div>

        <div className="p-6 mt-6 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                    Order Items
                </h2>

                <table className="w-full text-blue-900 my-5 p-3">
               <thead className=" bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 text-center lg:text-xl text-xs p-1 lg:p-8 h-[30px] w-full">
                   <tr>
                    <th className="p-4">Product Description</th>
                    <th className="p-4">Product Image</th>
                    <th className="p-4">Quantity</th> 
                    <th className="p-4">Price / Per Item </th> 
                    <th className="p-4">Amount </th>
              </tr>
            </thead>

             <tbody>
                      {order.items?.map((item) => {
                                                const product = products.find((p) => p.id === item.productId);

          return (
            <tr key={item.productId} className="border-b hover:bg-gray-50">
            

              <td className="p-3">
                {item.productId}
                {product?.brand || "Unknown Brand"}<br/>
                {product?.catagory || "Unknown Catagory" }<br/>
                {product?.name || "Unknown Product Name"}<br/>
                {product?.shape || "Unknown Shape"}<br/>
                {product?.dimension || "Unknown Dimension"}<br/>
              </td>
              <td className="p-3 flex items-center justify-center">
                <img src={product?.productImage} alt="Product Image" height="80px" width="80px" />
              </td>

              <td className="p-3 text-center">{item.quantity}</td>

              <td className="p-3 text-right">₹{item.price}</td>

              <td className="p-3 text-right font-semibold">
                ₹{item.price * item.quantity}
              </td>
            </tr>
          );
        })}
      </tbody>

      <tfoot>
        <tr className="bg-gray-100">
          <td colSpan={4} className="p-3 text-right font-bold">
            Total Amount
          </td>

          <td className="p-3 text-right font-bold text-blue-900">
            ₹{order.totalAmount}
          </td>
        </tr>
      </tfoot>


            </table>

        <h2 className="text-xl font-bold text-blue-900 mb-4">
                    Customer Info
        </h2>
        <div className="w-full flex flex-row justify-evenly p-4">
         <div className="w-full lg:w-1/2 shadow-lg rounded-lg h-auto customer-card p-2 font-serif font-normal text-blue-900 text-left bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 flex flex-col">
        <h1 className="text-sm lg:text-xl p-2 m-1">Name: {customer?.name}</h1>
        <h2 className="text-sm lg:text-xl p-2 m-1">Phone: {customer?.phone}</h2>
        <h2 className="text-sm lg:text-xl p-2 m-1">Email: {customer?.email}</h2>
        <h2 className="text-sm lg:text-xl p-2 m-1">Address: </h2>
        {customer.address?.split(",").map((line)=>
        (<p className='text-sm lg:text-lg p-2 m-1'>{line.trim()}</p>))}
        </div>

          <div className="flex justify-center items-center ">
          <img
            src={order.customerDesignImage} alt={`Design for ${order.id}`} className="w-56 h-56 object-contain mt-3 rounded-lg shadow-lg"
          /></div>
        </div>
          </div>

           {/* Order Status / Payment */}
      <div className="bg-white rounded-xl shadow-sm p-6">

        <h2 className="text-xl font-bold text-blue-900 mb-5">
          Update Order
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Order Status */}
          <div>

            <label className="block text-sm font-semibold 
                              text-gray-700 mb-2">
              Order Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 
                         rounded-lg outline-none 
                         focus:ring-2 focus:ring-blue-300"
            >

              

              <option value="pending">
                Pending
              </option>

              <option value="processing">
                Processing
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="delivered">
                Delivered
              </option>

              <option value="cancelled">
                Cancelled
              </option>

            </select>

          </div>
          
          {/* Payment Status */}
          <div>

            <label className="block text-sm font-semibold 
                              text-gray-700 mb-2">
              Payment Status
            </label>

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 
                         rounded-lg outline-none 
                         focus:ring-2 focus:ring-blue-300"
            >

              

              <option value="After Delivery">
                After Delivery
              </option>

              <option value="On Delivery">
                On Delivery
              </option>

              <option value="While Ordering">
                While Ordering
              </option>

              <option value="Refund Initiated">
                Refund Initiated
              </option>

               <option value="Refund Completed">
                Refund Completed
              </option>

            </select>

          </div>
          
          {/* Payment Mode */}
          <div>

            <label className="block text-sm font-semibold 
                              text-gray-700 mb-2">
              Payment Mode
            </label>

            <select
              value={payment}
              onChange={(e) => setPaymentmode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 
                         rounded-lg outline-none 
                         focus:ring-2 focus:ring-blue-300"
            >
              <option value="COD">
                Cash On Delivery
              </option>

              <option value="UPI">
                UPI Payment
              </option>
            </select>

          </div>
          
         

        </div>
          
            <div className="mt-6 flex justify-end">

          <button
            type="button"
            className="px-6 py-3 bg-blue-900 
                       text-white font-semibold rounded-lg 
                       hover:bg-blue-700 transition"

            onClick={updateOrder}
          >
            Update Order
          </button>
          
          </div>

          </div>

      </div>
      )} 
    </>
  );

}

export default OrderDetails;
