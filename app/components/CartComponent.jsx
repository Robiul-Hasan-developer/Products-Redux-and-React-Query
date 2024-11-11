
"use client";

import { Minus, Plus } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeToCart } from '../redux/cart/cartSlice';
import Link from 'next/link';
import { X } from '@phosphor-icons/react/dist/ssr';
import { toast, ToastContainer } from 'react-toastify';


const CartComponent = () => {

    const [delivery, setDelivery] = useState(20); 
    
    const cartItems = useSelector((state) => state.cart.items);    
    const dispatch = useDispatch(); 

    // Increment
    const handleIncrement = (cartItemId) => {
        dispatch(incrementQuantity((cartItemId)))
    }
    
    // Decrement
    const handleDecrement = (cartItem) => {
        if(cartItem.quantity === 1) {
            dispatch(decrementQuantity((cartItem.id)));
             toast.error("Product Removed from the cart", {
            theme: "colored",
            position: "bottom-right"
        });
        } else {
            dispatch(decrementQuantity((cartItem.id)));
        }
    }
    
    // Remove Cart
    const handleRemoveCart = (cartItemId) => {
        dispatch(removeToCart(cartItemId));
         toast.error("Product Removed from the cart", {
            theme: "colored",
            position: "bottom-right"
        });
    }
    
    // Subtotal & Total value
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)    
    

    return (
        <div className='my-[100px]'>
            <ToastContainer autoClose={2000} />
            <div className='container'>
                {
                    cartItems.length >= 1 ? 
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="col-span-12 lg:col-span-9">
                                <div className="relative overflow-x-auto">
                                    <table className="w-full min-w-[950px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="p-6 text-base text-start capitalize text-gray-600 rounded-s-lg">
                                                    Product name
                                                </th>
                                                <th scope="col" className="p-6 text-base text-center capitalize text-gray-600">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="p-6 text-base text-center capitalize text-gray-600">
                                                    Category
                                                </th>
                                                <th scope="col" className="p-6 text-base text-center capitalize text-gray-600 rounded-e-lg">
                                                    Price
                                                </th>
                                                <th scope="col" className="p-6 text-base text-center capitalize text-gray-600 rounded-e-lg">
                                                    Total Price
                                                </th>
                                                <th scope="col" className="p-6 text-base text-center capitalize text-gray-600 rounded-e-lg">
                                                    <span className="hidden">Action</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map((cartItem, cartIndex) => {
                                                    
                                                    return (
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={cartIndex}>
                                                            <td className="py-4 text-center pe-6">
                                                                <div className="flex items-center gap-6 max-w-[310px]">
                                                                    <div className="bg-gray-100 rounded-lg flex justify-center items-center max-w-[120px] max-h-[120px]">
                                                                        <img src={cartItem.thumbnail} alt="" />
                                                                    </div>
                                                                    <div className="text-start">
                                                                        <h6 className="">
                                                                            <Link href={`/product/${cartItem.id}`} className="hover:text-orange-600 transition-all duration-500 ease-in-out line-clamp-1">{cartItem.title}</Link>    
                                                                        </h6>
                                                                        <p className="mb-4 text-gray-500 line-clamp-2 max-w-[300px]">{cartItem.description}</p>
                                                                        <div className=""> 
                                                                            <span className="">Product ID: </span>
                                                                            <span className="font-semibold text-neutral-600"> {cartItem.id}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>                                            
                                                            </td>
                                                            <td className="py-4 text-center px-6 text-neutral-600 font-semibold">
                                                                <div className="product-qty flex items-center border border-neutral-200 rounded-lg justify-between p-1 w-[134px]">
                                                                    <button 
                                                                        type="button" 
                                                                        className='border-e border-gray-300 w-8 hover:text-orange-600 transition-all h-[22px] flex justify-center items-center active:scale-125'
                                                                        onClick={() => handleDecrement(cartItem)}
                                                                    >
                                                                        <Minus size={18} weight="bold" />
                                                                    </button>
                                                                    <span className="w-7 text-neutral-800 text-lg text-center">{cartItem.quantity}</span>
                                                                    
                                                                    <button 
                                                                        type="button" 
                                                                        className='border-s border-gray-300 w-8 hover:text-orange-600 transition-all h-[22px] flex justify-center items-center active:scale-125'
                                                                        onClick={() => handleIncrement(cartItem.id)}
                                                                    >
                                                                        <Plus size={18} weight="bold" />
                                                                    </button>
                                                                
                                                                </div>
                                                            </td>
                                                            <td className="py-4 text-center px-6 text-neutral-600 font-semibold">
                                                                <span className="capitalize">{cartItem.category}</span>
                                                            </td>
                                                            <td className="py-4 text-center px-6 text-neutral-600 font-semibold">
                                                                <span className="font-bold">${cartItem.price}</span>
                                                            </td>
                                                            <td className="py-4 text-center px-6 text-neutral-600 font-semibold">
                                                                <span className="font-bold">${(cartItem.price * cartItem.quantity).toFixed(2)}</span> 
                                                            </td>
                                                            <td className="py-4 text-center px-6 text-neutral-600 font-semibold">
                                                                <button 
                                                                    type="button" 
                                                                    onClick={()=> handleRemoveCart(cartItem.id)}
                                                                    className='w-10 h-10 text-red-600 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white active:scale-90 duration-200'
                                                                >
                                                                    <X size={20} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Link href="/" className='btn mt-6 bg-gray-900 hover:bg-gray-700'>Continue Shopping</Link>
                            </div>
                            <div className="col-span-12 lg:col-span-3">
                                <div className="border border-gray-200 bg-gray-50 p-6 rounded-lg sticky top-[120px]">
                                    <h4 className="mb-6 text-neutral-900">Summary</h4>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-neutral-400 font-medium text-lg">Discount</span>
                                            <span className="text-neutral-900 font-medium text-lg">$0.00</span>
                                        </div>    
                                        <div className="flex items-center justify-between">
                                            <span className="text-neutral-400 font-medium text-lg">Delivery</span>
                                            <span className="text-neutral-900 font-medium text-lg">${delivery}</span>
                                        </div>    
                                        <div className="flex items-center justify-between">
                                            <span className="text-neutral-400 font-medium text-lg">Subtotal</span>
                                            <span className="text-neutral-900 font-medium text-lg">${subtotal.toFixed(2)}</span>
                                        </div>    
                                        <div className="flex items-center justify-between">
                                            <span className="text-neutral-400 font-medium text-lg">Total</span>
                                            <span className="text-neutral-900 font-medium text-lg">${(subtotal + delivery).toFixed(2)}</span>
                                        </div>   
                                    </div>
                                    <Link href="#" className="btn mt-6 w-full text-center">Checkout</Link>
                                </div>
                            </div>
                        </div>
                    :  
                    // Empty Cart Message
                    <div className="text-center my-10">
                        <div className="max-w-[200px] mx-auto">
                            <img src="https://thumbs.dreamstime.com/b/realistic-empty-supermarket-shopping-cart-vector-illustration-isolated-white-background-realistic-empty-supermarket-shopping-118192710.jpg" alt="" />
                        </div>

                        <h4 className="my-6">Your cart is empty</h4>
                        <p className="text-gray-500 max-w-[500px] mx-auto text-lg">Looks like your haven't added anything to your cart yet. Add something to make me happy &#128522; </p>
                        <Link href="/" className="btn mt-6 ">Continue Shopping</Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default CartComponent;