'use client'

import { authClient } from '@/lib/auth-client'
import React, { useState } from 'react'
import Link from 'next/link'

const UserInfo = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const [open, setOpen] = useState(false)

    const handleSignout = async () => {
        await authClient.signOut()
        setOpen(false)
    }

    return (
        <div className="relative">
            {user ? (
                <div>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-800 text-2xl text-white">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <span className="font-semibold text-green-900">
                            {user.name}
                        </span>

                        <span className="text-gray-500">
                            {open ? '▲' : '▼'}
                        </span>
                    </button>

                    {open && (
                        <div className="absolute right-0 top-16 z-50 w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                            <div className="flex items-center gap-3 border-b pb-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-800 text-2xl text-white">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        {user.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setOpen(false)}
                                className="mt-3 block rounded-lg p-3 hover:bg-gray-100"
                            >
                                👤 আমার প্রোফাইল
                            </Link>

                            <button
                                onClick={handleSignout}
                                className="mt-1 w-full rounded-lg p-3 text-left text-red-600 hover:bg-gray-100"
                            >
                                ↩️ সাইন আউট
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex gap-3">
                    <Link href="/signin">
                        <button className="btn px-4">সাইন ইন</button>
                    </Link>

                    <Link href="/signup">
                        <button className="btn rounded-2xl bg-[#05893E] px-4 text-white">
                            সাইন আপ
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default UserInfo