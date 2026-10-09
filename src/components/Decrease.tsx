import React from 'react';
import AllProducts, { Product } from './AllProducts';
// type Product={
//     id:number;
//     change:{
//         dir:'up'|'down'|'flat';
//         pct:number;
//     };
// };
type DecreaseProps={
    products: Product[];
}

const Decrease = ({products}:DecreaseProps) => {
    const decreased=products.filter(product=>product.change.dir==="down")
    .sort((a,b)=>a.change.pct-b.change.pct)
    .slice(0,6)
    return (
        <div className='grid grid-cols-3'>
            {
                decreased.map(product=><AllProducts key={product.id} products={product}></AllProducts>)
            }
        </div>
    );
};

export default Decrease;