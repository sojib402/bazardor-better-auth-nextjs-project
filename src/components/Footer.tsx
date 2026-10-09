
import React from "react";

const Footer = () => {
  return (
    <div className="container mx-auto">
    <footer className="bg-base-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between gap-2 text-xs text-gray-600">
        <p>
          বাজার দর — ক্রেতাদের নিত্যদিনের বাজার দর সম্পর্কে জানতে সহায়তা করে।
        </p>

        <p>
          সকল বাজার দর সর্বশেষ প্রাপ্ত তথ্যের ভিত্তিতে প্রদর্শিত হয়।
        </p>
      </div>
    </footer>
    </div>
  );
};

export default Footer;

