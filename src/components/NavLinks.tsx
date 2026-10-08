"use cache";
import Link from 'next/link';
interface Category{
    id:string,
    slug:string,
    nameBn:string,
    icon:string
}
const NavLinks = async() => {
    const res=await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
    const data:Category[]=await res.json()
    // console.log(data)
    return (
        <div className='flex gap-6 mt-6 mx-5'>
            {
                data.map((n,i)=><Link key={i} href={n.id}><span>{n.icon}</span>{n.nameBn}</Link>)
            }
        </div>
    );
};

export default NavLinks;