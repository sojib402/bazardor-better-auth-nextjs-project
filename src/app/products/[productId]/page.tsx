
type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
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
    dir: string;
    pct: number;
  };
  markets: Market[];
};
export const instant = false;
const NewsDetails = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  let data: Product | null = null;
  let error = false;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Product not found");
    }

    data = await res.json();
  } catch {
    error = true;
  }

  if (error || !data) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found or failed to load.
      </div>
    );
  }

  const prices = [
    { title: "গতকালের দাম", price: data.yesterday },
    { title: "গত সপ্তাহের দাম", price: data.lastWeek },
    { title: "গত মাসের দাম", price: data.lastMonth },
  ];

  return (
    <div className="min-h-screen bg-[#F0F5F0] px-4 py-6 text-[#25352B]">
      <div className="mx-auto max-w-5xl space-y-4">
        <p className="text-xs text-gray-500">
          হোম &gt; {data.categoryNameBn} &gt; {data.nameBn}
        </p>

        <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#E1E9E1] bg-white p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl">
              {data.image}
            </div>

            <div>
              <h1 className="text-xl font-bold">{data.nameBn}</h1>
              <p className="text-sm text-gray-500">
                {data.categoryNameBn} · {data.unit}
              </p>
              <p className="mt-1 text-xs text-gray-600">
                গতকালের তুলনায় আজকের বাজারদর
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#F0F5F0] px-6 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের বাজারদর</p>
            <p className="text-3xl font-bold">
              {data.today} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">
              টাকা / {data.unit}
            </p>
            <p
              className={`mt-1 text-sm font-semibold ${
                data.change.dir === "up"
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {data.change.dir === "up" ? "▲" : "▼"}{" "}
              {data.change.pct}%
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[#E1E9E1] bg-white p-4">
          <h2 className="mb-3 text-sm font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {prices.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#E1E9E1] p-4"
              >
                <p className="text-xs text-gray-500">
                  {item.title}
                </p>
                <p className="mt-1 text-xl font-bold text-green-600">
                  {item.price} টাকা
                </p>
                <p className="text-xs text-gray-500">
                  টাকা / {data.unit}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#E1E9E1] bg-white p-4">
          <h2 className="mb-4 text-sm font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#E1E9E1] text-xs text-gray-500">
                  <th className="px-3 py-3">বাজার</th>
                  <th className="px-3 py-3">বিভাগ</th>
                  <th className="px-3 py-3 text-right">সর্বনিম্ন</th>
                  <th className="px-3 py-3 text-right">সর্বোচ্চ</th>
                  <th className="px-3 py-3 text-right">গড়</th>
                </tr>
              </thead>

              <tbody>
                {data.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-b border-[#DCE4DC] ${
                      index % 2 === 0
                        ? "bg-[#FAFCFA]"
                        : "bg-[#F0F5F0]"
                    }`}
                  >
                    <td className="px-3 py-3 font-medium">
                      {market.market}
                    </td>
                    <td className="px-3 py-3">
                      {market.division}
                    </td>
                    <td className="px-3 py-3 text-right">
                      {market.min} টাকা
                    </td>
                    <td className="px-3 py-3 text-right">
                      {market.max} টাকা
                    </td>
                    <td className="px-3 py-3 text-right font-semibold">
                      {((market.min + market.max) / 2).toFixed(2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;

