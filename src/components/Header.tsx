'use client'
import Image from 'next/image';
import NavLinks from './NavLinks';
const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: 'full'
    })
    console.log(date)
    return (
       <div className='container'>
        <div className='w-full flex justify-between mt-5'>
            <div className='flex gap-5'>
                <div className='w-[50px] h-[50px] bg-[#05893E] flex items-center justify-center'>
                    <Image height={30} width={30} src="/logo-icon.png" alt="Logo" />
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-2xl font-bold'>বাজার দর</h2>
                    <p>{date}</p>
                </div>
            </div>
            <div className='flex gap-5'>
                <button className='btn px-4'>সাইন ইন</button>
                <button className='btn bg-[#05893E]  px-4 rounded-2xl'>সাইন আপ</button>
            </div>
            
        </div>
        <NavLinks/>
    </div>
        
        
    );
};

export default Header;