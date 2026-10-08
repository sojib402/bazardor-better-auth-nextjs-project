
import Image from 'next/image';
import NavLinks from './NavLinks';
import Marquee from './Marquee';
import DateDisplay from './DateDisplay';
const Header = () => {
    
    // console.log(date)
    return (
       <div className='container'>
        <div className='w-full flex justify-between mt-5'>
            <div className='flex gap-5'>
                <div className='w-[50px] h-[50px] bg-[#05893E] flex items-center justify-center'>
                    <Image height={30} width={30} src="/logo-icon.png" alt="Logo" />
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-2xl font-bold'>বাজার দর</h2>
                    <DateDisplay/>
                </div>
            </div>
            <div className='flex gap-5'>
                <button className='btn px-4'>সাইন ইন</button>
                <button className='btn bg-[#05893E]  px-4 rounded-2xl'>সাইন আপ</button>
            </div>
            
        </div>
        <NavLinks/>
        <Marquee/>
    </div>
        
        
    );
};

export default Header;