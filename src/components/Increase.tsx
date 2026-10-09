
import AllProducts, { Product } from "./AllProducts";

// type Product = {
//   id: number;
//   change: {
//     dir: "up" | "down" | "flat";
//     pct: number;
//   };
// };

type IncreaseProps = {
  products: Product[];
};

const Increase = ({ products }: IncreaseProps) => {
  const increased = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="grid grid-cols-3 gap-4 mt-5">
      {increased.map((product) => (
        <AllProducts
          key={product.id}
          products={product}
        />
      ))}
    </div>
  );
};

export default Increase;
