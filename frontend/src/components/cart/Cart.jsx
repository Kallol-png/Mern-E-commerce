import React,{useState,useEffect} from 'react'
import './Cart.css'
import Navbar from '../shared/navbar/Navbar'
import Footer from '../shared/footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { deleteShoppingCart, getStoredCart, removeFromDB } from '../../utilities/LocalDB'
import products from '../../Data/productsData.json'
import Swal from 'sweetalert2'

const Cart = () => {
  const navigate = useNavigate();
  const[disabled,setDisabled] = useState(true)
  let savedCart = getStoredCart();
  let cart = [];
  for(let key in savedCart){
    cart.push({
      ...products.find(pd=>pd.id===key),
      quantity:savedCart[key]
    })
  }
  useEffect(()=>{
    if(cart.length > 0){
      setDisabled(false);
      document.getElementById('btn_checkout').style.cursor='pointer';
      document.getElementById('btn_checkout').className='btn btn-dark mx-auto d-block p-2'
      document.getElementById('btn_checkout_sm').className='btn btn-dark mx-auto d-block p-2'
    }
  },[])
  const handleClick=()=>{
    if(cart.length > 0){
      navigate('/shipping');
    }else{
      Swal.fire({
        title: "Error!",
        text: `Your Cart is Empty!`,
        icon: "Error"
      });
    }
  }
  return (
    <section className='bg-brand bg-brand-container'>
      <Navbar/>
      <div className="container mt-5">
        <div className="row">
        <div className="cart-container col-lg-9">
         <h1 className='fs-4'>Shopping Cart</h1>
         {
          cart?.length > 0 ?
          <div className="table-responsive">
         <table style={{border:'1px solid lightgrey'}} className='table table-striped'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Sub Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((product,index)=>
                <tr key={index+1}>
                  <td><img src={product.image} className='img-fluid' width={40}  alt={product.name} /></td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price*product.quantity}</td>
                  <td><button onClick={()=>{removeFromDB(product.id)}} className='btn btn-danger'>Remove</button></td>
               </tr>
              )
            }
          </tbody>
         </table>
         <button onClick={()=>{deleteShoppingCart()}} className='btn btn-outline-danger py-2'>Remove All Products</button>
         </div>:
         <p style={{maxWidth:'500px',backgroundColor:'#E9EEF4'}} className='p-2'>Your Cart is Empty <Link to='/products' className='text-decoration-none'>Go back</Link></p>
         }
          
        </div>
        
        <div className="col-lg-3 mt-5 d-none d-lg-block">
          
          <div style={{border:'1px solid lightgrey'}} className='p-2'>
            <h2 className='fs-5 text-center'>Subtotal: {cart.reduce((a,b)=>{return a+b.quantity},0)} item(s)</h2>
            <h3 className='fs-5 text-center'>Price:{cart.reduce((a,b)=>{return a+b.quantity*b.price},0)} Taka</h3>
          </div>
          <div onClick={()=>handleClick()} style={{border:'1px solid lightgrey'}} className='py-2'>
            <button id='btn_checkout'  className='btn btn-secondary mx-auto d-block' disabled={disabled}>Proceed to Checkout</button>
          </div>

        </div>
        <div style={{boxShadow:'0 3px 10px 3px #0003'}} className="col-lg-3 mt-5 d-lg-none fixed-bottom bg-brand py-3">
          
          <div style={{border:'1px solid lightgrey'}} className='p-2'>
            <h2 className='fs-5 text-center'>Subtotal: {cart.reduce((a,b)=>{return a+b.quantity},0)} item(s)</h2>
            <h3 className='fs-5 text-center'>Price:{cart.reduce((a,b)=>{return a+b.quantity*b.price},0)} Taka</h3>
          </div>
          <div onClick={()=>handleClick()} style={{border:'1px solid lightgrey'}} className='py-2'>
            <button id='btn_checkout_sm'  className='btn btn-secondary mx-auto d-block' disabled={disabled}>Proceed to Checkout</button>
          </div>

        </div>
        </div>
        
      </div>
      <Footer/>
    </section>
  )
}

export default Cart