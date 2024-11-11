"use client"; 

import React from 'react';
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from 'next/link';
import { ShoppingCart, SmileySad, Star } from '@phosphor-icons/react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Fetch Products 
const fetchProducts = async ({ limit, skip, q, category}) => {
    let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`;
    if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }
    const response = await axios.get(url);
    return response.data;
}

// Fetch Categories
const fetchCategories = async () => {
    const res = await axios.get(`https://dummyjson.com/products/categories`);
    return res.data;
}



const Products = () => {

    // ******************************* Redux code start *******************************
    const cartItems = useSelector((state) => state.cart.items)
    const dispatch = useDispatch(); 

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        const isInCart = cartItems.some((item) => item.id === product.id);

        if(!isInCart) {
            toast.success("Lorem ipsum dolor", {
                theme: "colored",
                position: "bottom-right"
            })
        } else {
            toast.error("Product Removed from the cart", {
                theme: "colored",
                position: "bottom-right"
            });
        }
    };
    // ******************************* Redux code End  *******************************
    
    
    const searchParams = useSearchParams();
    const router = useRouter(); 

    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = parseInt(searchParams.get('skip') || '0');
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    

    // ******************************* Query Start *******************************
    // Product Query
    const { isPending, isLoading, error, data } = useQuery({
        queryKey: ['products', limit, skip, q, category],
        queryFn: () => fetchProducts({ limit, skip, q, category }),
        placeholderData: keepPreviousData
    });

    // Categories Query
    const { isPending: categoriesPending, isLoading: categoriesLoading, error: categoriesError, data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        placeholderData: keepPreviousData
    });
    // ******************************* Query end *******************************


    // Current page
    const currentPage = Math.floor(skip / limit) + 1;
    // Total page
    const totalPage = Math.ceil(data?.total / limit);


    // ******************************* Handle Click Start *******************************
    // Next Page
    const handleNextPage = () => {
        router.push(`?limit=${limit}&skip=${skip + limit}${q ? `&q=${q}` : ''}${category ? `&category=${category}` : ''}`);
    }
    
    // Prev Page
    const handlePrevPage = () => {
        if (skip > 0) {
            router.push(`?limit=${limit}&skip=${skip - limit}${q ? `&q=${q}` : ''}${category ? `&category=${category}` : ''}`);
        }
    }

    // Handle search product
    const handleSearchProduct = (event) => {
        const newQuery = event.target.value;
        if (newQuery) {
            router.push(`?limit=${limit}&skip=0&q=${newQuery}`);
        } else {
            router.push(`?limit=${limit}&skip=0`);
        }
    }
    
    // Handle Category selection
    const handleCategory = (event) => {
        const newCategory = event.target.value;
        if(newCategory) {
            router.push(`?limit=${limit}&skip=0${q ? `&q=${q}` : ''}&category=${newCategory}`);
        } else {
            router.push(`?limit=${limit}&skip=0`);
        }
    }
    // ******************************* Handle Click End *******************************


    if (isPending || isLoading) {
        return <h3 className='container'>Loading...</h3>
    }

    if (error) {
        return <h3>{error.message}</h3>
    }
    

    return (
        <div className='container'>
            <ToastContainer autoClose={2000} />

            {/* Filter Search Start */}
            <div className="flex justify-between flex-wrap gap-6 md:gap-10 mb-8">
                <div className="flex items-center gap-6 flex-wrap grow">
                    <h4 className="font-semibold mb-0">Search: </h4>
                    <input
                        type="text"
                        className="bg-white h-[56px] rounded-lg py-4 px-6 border border-gray-300 focus:border-orange-600 focus:outline-none col-span-12 sm:col-span-6 flex-grow text-xl"
                        placeholder="Search Products Here...."
                        onChange={handleSearchProduct}
                        defaultValue={q} 
                    />
                </div>

                <div className="flex items-center gap-6 flex-wrap">
                    <h1 className="font-semibold mb-0 text-xl">Filter By Category: </h1>

                    <select 
                        className='bg-white h-[56px] rounded-lg px-4 border border-gray-300 focus:border-orange-600 focus:outline-none col-span-12 sm:col-span-6 flex-grow'
                        onChange={handleCategory}
                    >
                        <option value="">Select Category</option>
                        {categories?.map((category, catIndex) => (
                            <option value={category.slug} key={catIndex}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
            {/* Filter Search End */}

            
            {/* Products Start */}
            {data?.products.length !== 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.products.map((product, index) => {

                            /* Is cart Item exists in the items */
                            const isInCart = cartItems.some((item) => item.id === product.id);
                            
                            return (
                                <div className="card group" key={index}>
                                    <div className="bg-slate-200 rounded-lg relative overflow-hidden">
                                        <Link href={`/product/${product.id}`} className="text-center">
                                            <img src={product.thumbnail} alt={product.title} className="group-hover:scale-125 transition-transform duration-500 ease-in-out w-full h-full" />
                                        </Link>
                                        <button 
                                            type='button' 
                                            className={`w-11 h-11 text-sm rounded-full flex justify-center items-center absolute right-4 top-4 transition-all duration-300 active:scale-75 ${isInCart ? 'bg-orange-600 text-white' : 'bg-white text-gray-500 hover:text-orange-600'}`}
                                            onClick={()=>handleAddToCart(product)}
                                        >
                                            <ShoppingCart size={24} />
                                        </button>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex justify-between gap-2 mb-3">
                                            <div className="flex gap-2 text-gray-500"> 
                                                <span>Price: </span>
                                                <h6 className="text-lg mb-0 font-bold text-orange-600">${product.price.toFixed(2)}</h6>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Star size={20} weight="fill" color="#ff9008" />    
                                                <span className="text-gray-500">({product.rating})</span>
                                            </div>
                                        </div>
                                        <h4> 
                                            <Link href={`/product/${product.id}`} className="hover:text-orange-600 transition-all duration-500 ease-in-out">{product.title}</Link>    
                                        </h4>
                                        <p className="text-base text-gray-500 line-clamp-2">{product.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Pagination Start */}
                    {
                        data?.total > limit ? 
                            <div className="flex gap-2 items-center justify-center my-6">
                                <button
                                    onClick={handlePrevPage}
                                    className={`px-4 py-2 bg-orange-600 rounded-md text-white transition-all ${skip === 0 ? 'opacity-70 cursor-no-drop' : 'hover:bg-orange-700 active:scale-95'}`}
                                    disabled={skip === 0}
                                >
                                    Previous Page
                                </button>
                                <p className="text-lg">Current Page: <span className="font-bold text-orange-600">{currentPage}</span> / {totalPage}</p>
                                <button
                                    onClick={handleNextPage}
                                    className={`px-4 py-2 bg-orange-600 rounded-md text-white transition-all ${currentPage === totalPage ? 'opacity-70 cursor-no-drop' : 'hover:bg-orange-700 active:scale-95'}`}
                                    disabled={currentPage === totalPage}
                                >       
                                    Next Page
                                </button>
                            </div>
                        :
                        ""
                    }
                    {/* Pagination End */}
                </>
            ) : (
                <div className="flex items-center text-center flex-col gap-4 mt-16">
                    <SmileySad size={64} className='text-gray-500' />
                    <h2 className="font-semibold text-center">Data Not Found!!!</h2>
                </div>
            )}
            {/* Products End */}
        </div>
    );
};

export default Products;

