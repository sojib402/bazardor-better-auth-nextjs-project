
import React from 'react';
import Link from 'next/link';
 export type Product = {
  id: number;
  image: string;
  nameBn: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type Props = {
  products: Product;
};
const AllProducts = ({products}:Props) => {

    return (
      <Link href={`/products/${products.id}`}>
            <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1F6F1] text-2xl">
          {products.image}
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">
            {products.nameBn}
          </h3>

          <p className="text-xs text-gray-500">
            প্রতি {products.unit}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="text-xl font-bold text-gray-900">
            {products.today} টাকা
          </p>
        </div>

        {products.change.dir === "up" && (
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
            ▲ {products.change.pct}%
          </span>
        )}

        {products.change.dir === "down" && (
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
            ▼ {Math.abs(products.change.pct)}%
          </span>
        )}

        {products.change.dir === "flat" && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            ━ 0.0%
          </span>
        )}
      </div>
    </div>
    </Link>
    
    );
};

export default AllProducts;


