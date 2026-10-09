import React from "react";
import Image from "next/image";
import bannerImage from "../../public/bazar-hero.png";
import DateDisplay from "./DateDisplay";

const Banner = () => {
    return (
        <section className="mx-auto mt-6 container px-4">
            <div className="flex min-h-[260px] items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white px-8 py-8 shadow-sm">
                <div className="max-w-2xl">
                    <DateDisplay/>

                    <h1 className="text-3xl font-bold leading-tight text-gray-800 md:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারদরটির বিস্তারিত বিবরণ, ছাড়, পরিবর্তনসহ বাজারের
                        সর্বশেষ আপডেট এক নজরে পান।
                    </p>

                    <button className="btn mt-5 border-0 bg-green-600 px-6 text-white hover:bg-green-700">
                        সব দাম দেখুন
                    </button>
                </div>

                <div className="hidden md:block">
                    <Image
                        src={bannerImage}
                        alt="Banner"
                        width={350}
                        height={250}
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;