"use cache";
import Link from 'next/link';
interface Category{
    id:string,
    slug:string,
    nameBn:string,
    icon:string
}
const NavLinks = async() => {
    const res=await fetch('https://openapi.programming-hero.com/api/bazardor/categories')
    const data:Category[]=await res.json()
    
    return (
        <div className='container'>
        <div className='flex gap-6 mt-6 mx-5'>
            {
                data.map((n,i)=><Link key={i} href={`/category/${n.id}`}><span>{n.icon}</span>{n.nameBn}</Link>)
            }
        </div>
        </div>
    );
};

export default NavLinks;