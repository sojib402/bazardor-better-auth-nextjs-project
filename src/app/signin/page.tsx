
"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      
      email: user.email,
      password: user.password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
      redirect("/");
    }
  };
 const handleGoogleSignIn=async ()=>{
  const data = await authClient.signIn.social({
    provider: "google",
  });
}
 const handleGithubSignIn=async ()=>{
  const data = await authClient.signIn.social({
    provider: "github",
  });
  console.log(data)
 }
  return (
    <div className="min-h-screen bg-[#f0f5f0] px-4 py-8">
      <h1 className="text-center text-2xl font-bold">
        সাইন ইন
      </h1>

      <p className="mt-2 text-center text-sm text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে প্রবেশ করুন।
      </p>

      <div className="mt-6 flex justify-center">
        <form onSubmit={onSubmit} className="w-full max-w-md">
          <fieldset className="fieldset rounded-2xl border border-gray-200 bg-[#fafcf9] p-5 shadow-sm">
            <label className="label text-sm text-gray-800">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              required
              className="input h-10 w-full bg-transparent"
              placeholder="you@example.com"
            />

            <label className="label mt-2 text-sm text-gray-800">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              className="input h-10 w-full bg-transparent"
              placeholder="পাসওয়ার্ড লিখুন"
            />

            <button
              type="submit"
              className="btn mt-4 min-h-10 w-full border-none bg-green-700 text-white hover:bg-green-800"
            >
              সাইন ইন
            </button>

            <div className="my-2 flex items-center gap-3">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-xs text-gray-500">অথবা</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="btn min-h-9 border-gray-200 bg-transparent px-2 text-xs"
              >
                Google দিয়ে চালিয়ে যান
              </button>

              <button
               onClick={handleGithubSignIn}
                type="button"
                className="btn min-h-9 border-gray-200 bg-transparent px-2 text-xs"
              >
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            <p className="mt-2 text-center text-xs text-gray-600">
              অ্যাকাউন্ট নেই?{" "}
              <a href="/signup" className="text-green-700">
                সাইন আপ করুন
              </a>
            </p>
          </fieldset>
        </form>
      </div>

      <Link href={'/'}><p className="mt-5 text-center text-sm text-gray-400">
        ← হোম পেজে ফিরে যান
      </p></Link>
    </div>
  );
};

export default SignInPage;
