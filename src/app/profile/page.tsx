
'use client'

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const ProfilePage = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const [show, setShow] = useState(false)

    const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const newUserData = {
            name: formData.get("name") as string
        }

        const { error } = await authClient.updateUser({
            name: newUserData.name
        })

        if (error) {
            console.log(error)
            return
        }

        console.log(newUserData)
        setShow(false)
    }

    const handleShowForm = () => {
        setShow(!show)
    }

    return (
        <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
            <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                    <img
                        alt="Welcome to our User"
                        src={user?.image || "/default-avatar.png"}
                    />
                </div>
            </div>

            <h2 className="mt-3">{user?.name}</h2>
            <p className="mt-3">{user?.email}</p>

            <button
                onClick={handleShowForm}
                type="button"
                className="btn btn-outline mt-4"
            >
                {show ? "Cancel" : "Edit Profile"}
            </button>

            {show && (
                <form
                    onSubmit={handleUpdateProfile}
                    className="w-full max-w-md mt-4"
                >
                    <fieldset className="fieldset bg-[#fafcf9] border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <label className="label text-base text-gray-800">
                            নাম
                        </label>

                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.name || ""}
                            required
                            className="input w-full bg-transparent"
                            placeholder="Enter your name"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Update Profile
                        </button>
                    </fieldset>
                </form>
            )}
        </div>
    )
}

export default ProfilePage
