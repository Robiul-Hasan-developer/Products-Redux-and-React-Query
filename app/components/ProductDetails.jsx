"use client";

import { Star } from '@phosphor-icons/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

// Fetch Data
const fetchProducts = async ({ productId }) => {
    let url = `https://dummyjson.com/products/${productId}`;
    const response = await axios.get(url);
    return response.data;
}

const ProductDetails = ({ productId }) => {
    
    // Product Query
    const { isPending, isLoading, error, data } = useQuery({
        queryKey: ['products', productId],
        queryFn: () => fetchProducts({ productId }),
        placeholderData: keepPreviousData
    });
    

    if (isPending || isLoading) {
        return <h3 className='container'>Loading...</h3>
    }

    if (error) {
        return <h3>{error.message}</h3>
    }

    const rating = Math.round(data.rating);

    
    return (
        <div className='container my-[100px]'>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-5 ">
                    <div className="bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                        <img src={data.thumbnail} alt="Main Product" />
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                        {
                            data.images.map((image, imageIndex) => {
                                return (
                                    <div
                                        className="bg-gray-100 rounded flex items-center justify-center border border-gray-200 max-w-[140px] cursor-pointer hover:border-orange-600 duration-300"
                                        key={imageIndex}
                                    >
                                        <img src={image} alt={`Thumbnail ${imageIndex}`} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="col-span-12 md:col-span-7">
                    <span className="bg-green-600 text-white px-5 py-2 rounded-md">{data.brand}</span>
                    <h2 className="mt-4">{data.title}</h2>
                    <p className="my-4 text-gray-600 text-lg">{data.description}</p>
                    <div className="flex items-center gap-2">
                        <ul className='flex items-center gap-1'>
                            {
                                [...Array(5)].map((_, index) => {
                                    return (
                                        <li className={index < rating ? 'text-amber-500' : 'text-gray-400'} key={index}>
                                            <Star size={20} weight="fill" />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <span className="text-neutral-900 font-semibold text-lg">{data.rating}</span>
                        <span className="text-neutral-600 font-semibold text-lg"> ({data.reviews.length}k Reviews) </span>
                    </div>
                    <h2 className="mt-4 text-orange-600">${data.price}</h2>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
