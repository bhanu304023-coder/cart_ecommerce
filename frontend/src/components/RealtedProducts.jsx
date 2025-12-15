import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';
import Card from './Card';

const RealtedProducts = ({ category, subCategory, currentProductId }) => {

    const { products } = useContext(shopDataContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
        const filtered = products
            .filter(item => item.category === category)
            .filter(item => item.subCategory === subCategory)
            .filter(item => item._id !== currentProductId); 
        setRelatedProducts(filtered.slice(0, 4));
        }
    }, [products, category, subCategory, currentProductId]);

    return (
        <div className="my-24 px-6">
            <div className="max-w-7xl mx-auto">
                <Title text1="RELATED" text2="PRODUCTS" />
                <div className="mt-10 flex flex-wrap gap-8 justify-left">
                    {relatedProducts.map(item => (
                        <Card
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        img={item.image1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RealtedProducts;
