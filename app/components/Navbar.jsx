"use client"

import { ShoppingCart } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const pathname = usePathname();

    // total quantity of items in the cart
    const cartItems = useSelector((state) => state.cart.items);
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    
    return (
        
        <nav className="bg-gray-100 py-5 mb-6 sticky top-0 z-10 border-b border-gray-200">
            <div className="container">
                <div className="flex items-center justify-between gap-2">
                    <Link href="/" className='font-bold uppercase text-orange-600 text-2xl transition-all hover:font-black'>LOGO</Link>

                    <div className="flex items-center justify-center gap-1">
                        <Link href='/' className="">
                            <span className={`inline-block px-6 py-2.5 font-semibold text-base hover:bg-gray-200 hover:text-gray-900 rounded-lg ${pathname === '/' || pathname.startsWith('/product') ? 'bg-orange-600 hover:bg-orange-700 text-white hover:text-white' : ''} `}>
                                Home
                            </span>
                        </Link>
                        <Link href='/cart' className="">
                            <span className={`inline-block px-6 py-2.5 font-semibold text-base hover:bg-gray-200 hover:text-gray-900 rounded-lg ${pathname.startsWith('/cart') ? 'bg-orange-600 hover:bg-orange-700 text-white hover:text-white' : ''} `}>
                                Cart
                            </span>
                        </Link>
                        {/* <Link href='/counter' className="">
                            <span className={`inline-block px-6 py-2.5 font-semibold text-base hover:bg-gray-200 hover:text-gray-900 rounded-lg ${pathname.startsWith('/counter') ? 'bg-orange-600 hover:bg-orange-700 text-white hover:text-white' : ''} `}>
                                Counter
                            </span>
                        </Link> */}
                    </div>

                    <Link href='/cart' className="text-gray-600 relative hover:text-orange-600 transition-all duration-200 active:scale-90">
                        <ShoppingCart size={32} />
                        <span className="w-6 h-6 bg-orange-600 text-white border-2 border-white rounded-full flex items-center justify-center text-xs absolute -end-2 -top-2">
                            {totalCartQuantity}
                        </span>
                    </Link>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;