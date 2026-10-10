"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  nameBn: string;
  categoryIcon?: string;
  categoryNameBn?: string;
  image?: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  change?: {
    dir: string;
    pct: number;
  };
  markets?: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

const CategoryNews = ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const [categoryId, setCategoryId] = useState("");
  const [data, setData] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    params.then((p) => setCategoryId(p.categoryId));
  }, [params]);

  useEffect(() => {
    if (!categoryId) return;

    fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
    )
      .then((res) => res.json())
      .then((result) => setData(result));
  }, [categoryId]);

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "low") return a.today - b.today;
    if (sortBy === "high") return b.today - a.today;
    return 0;
  });

  const formatUnit = (unit: string) => {
    const units: Record<string, string> = {
      kg: "কেজি",
      litre: "লিটার",
      dozen: "ডজন",
      piece: "টি",
    };

    return units[unit] || unit;
  };

  return (
    <div className="min-h-screen bg-[#F0F5F0] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-white p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EEF4EE] text-3xl">
            {data[0]?.categoryIcon || "🛒"}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {data[0]?.categoryNameBn || "পণ্যের তালিকা"}
            </h2>
            <p className="text-sm text-gray-500">
              প্রতিদিনের বাজারদর ও দামের পরিবর্তন
            </p>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between rounded-xl bg-white px-4 py-3">
          <p className="text-sm text-gray-500">
            মোট {data.length} টি পণ্য
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedData.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white p-4 hover:shadow-lg"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                  {product.image || "🛒"}
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-gray-500">
                    প্রতি {formatUnit(product.unit)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">আজকের দাম</p>
                  <p className="text-xl font-bold">
                    {product.today.toLocaleString("bn-BD")} টাকা
                  </p>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    product.change?.dir === "up"
                      ? "bg-red-50 text-red-600"
                      : product.change?.dir === "down"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {product.change?.dir === "up"
                    ? "▲"
                    : product.change?.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                  {Math.abs(product.change?.pct ?? 0)}%
                </span>
              </div>

              <div className="mt-4 border-t pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">গতকালের দাম</span>
                  <span>
                    {product.yesterday.toLocaleString("bn-BD")} টাকা
                  </span>
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-gray-500">গত সপ্তাহের দাম</span>
                  <span>
                    {product.lastWeek.toLocaleString("bn-BD")} টাকা
                  </span>
                </div>

                {product.markets?.[0] && (
                  <div className="mt-3 rounded-lg bg-[#F0F5F0] p-3">
                    <p className="text-xs text-gray-500">
                      {product.markets[0].market}
                    </p>

                    <div className="mt-1 flex flex-wrap justify-between gap-2">
                      <span className="text-sm font-semibold">
                        {product.markets[0].min} -{" "}
                        {product.markets[0].max} টাকা
                      </span>

                      <span className="text-xs text-gray-500">
                        {product.markets[0].division}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <div className="rounded-2xl bg-white px-4 py-12 text-center">
            <p className="text-4xl">🛒</p>
            <h3 className="mt-3 font-bold text-gray-700">
              কোনো পণ্য পাওয়া যায়নি
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryNews;