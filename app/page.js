import React, { Suspense } from 'react';
import Products from "./components/Products";

export default function Home() {
    return (
        <Suspense fallback={<div>Loading products...</div>}>
            <Products />
        </Suspense>
    );
}
