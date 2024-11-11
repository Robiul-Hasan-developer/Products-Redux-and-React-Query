import ProductDetails from '@/app/components/ProductDetails';
import React from 'react';



const ProductId = async ({ params }) => {
    const { id } = await params; 

    return (
        <ProductDetails productId={id} />
    );
};

export default ProductId;