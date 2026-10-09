

import Banner from "@/components/Banner";
import Header from "@/components/Header";
import AllProducts from "@/components/AllProducts";
import Increase from "@/components/Increase";
import Decrease from "@/components/Decrease";
import NavLinks from "@/components/NavLinks";
// type Product = {
//   id: number;
//   change: {
//     dir: "up" | "down" | "flat";
//     pct: number;
//   };
// };
// type PageProps = {
//   products: Product[];
// };
export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};
export const instant = false;
export type Products = Product[];
export default async function Home() {
  const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products')
  const data:Product[] = await res.json()
  console.log(data, 'checking by sojib')
  return (

    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      {/* <NavLinks/> */}
      
      <Banner />


      <div className="container">

        <div className="mt-7">
          <span className="text-red-500 text-2xl">▲</span>
          <span className="text-2xl font-bold">আজ দাম বেড়েছে</span>
          <div>
            {
              <Increase products={data} />
            }
          </div>
        </div>
        <div className="mt-7">
          <span className="text-[#1A9951] text-2xl">▼</span>
          <span className="text-2xl font-bold">আজ দাম কমেছে</span>
          <div>
            {
              <Decrease products={data} />
            }
          </div>
        </div>

        <div>

          <div>
            <h2 className="text-2xl font-bold mt-7">সব পণ্য</h2>
            <p className="mb-7">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
            <div className="grid grid-cols-3 gap-4">
            {
              data.map(product => <AllProducts key={product.id} products={product}></AllProducts>)
            }
          </div>
          </div>
        </div>
      </div>


    </div>

  );
}
