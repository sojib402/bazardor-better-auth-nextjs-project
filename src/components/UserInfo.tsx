'use client'
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import React from 'react';
import Link from 'next/link';

const UserInfo = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const handleSignout=async()=>{
        await authClient.signOut();
    }
    return (
        <div>
            {
                user ? <div>
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            <img alt="Welcome to our User" src={user?.image as string} />
                        </div>
                    </div>
                    <h2 className='mt-3'>{user?.name}</h2>
                    <p className='mt-3'>{user?.email}</p>
                    <button onClick={handleSignout} className='btn btn-error btn-xs mt-4'>Signout</button>
                </div> : <div className='flex gap-5'>
                    <Link href={'/signin'}><button className='btn px-4'>সাইন ইন</button></Link>
                    <Link href={'/signup'}><button className='btn bg-[#05893E]  px-4 rounded-2xl'>সাইন আপ</button></Link>
                </div>
            }

        </div>
    );
};

export default UserInfo;