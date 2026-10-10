
"use client";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries()) as {name:string,email:string,password:string,confirmPassword:string};
    console.log(user)
     if (user.password !== user.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }
    const {data,error}=await authClient.signUp.email({
        
         name:user.name,
         email:user.email,
         password:user.password,
        callbackURL:'/'
    });
    if(data){
      toast.success('signUp successfully')
        console.log(data);
        
        
    }
    if(error){
        console.log(error);
        toast.error('signUp Failure.try again')
    }

   

    // console.log(user);
  };
const handleGoogleSignIn=async ()=>{
  const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log(data)
 }
 const handleGithubSignIn=async ()=>{
  const data = await authClient.signIn.social({
    provider: "github",
  });
  
 }
  return (
    <div className="min-h-screen bg-[#f0f5f0] px-4 py-10">
      <h1 className="text-center text-2xl font-bold">
        অ্যাকাউন্ট তৈরি করুন
      </h1>

      <p className="text-center text-gray-500 mt-2">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
      </p>

      <div className="flex justify-center mt-8">
        <form onSubmit={onSubmit} className="w-full max-w-md">
          <fieldset className="fieldset bg-[#fafcf9] border border-gray-200 rounded-2xl p-6 shadow-sm">
            <label className="label text-base text-gray-800">
              নাম
            </label>
            <input
              type="text"
              name="name"
              required
              className="input w-full bg-transparent"
              placeholder="Enter your name"
            />

            <label className="label text-base text-gray-800 mt-2">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              required
              className="input w-full bg-transparent"
              placeholder="you@example.com"
            />

            <label className="label text-base text-gray-800 mt-2">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              className="input w-full bg-transparent"
              placeholder="Enter your password"
            />

            <label className="label text-base text-gray-800 mt-2">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              minLength={8}
              className="input w-full bg-transparent"
              placeholder="Re-enter your password"
            />

            <button
              type="submit"
              className="btn w-full mt-5 bg-green-700 hover:bg-green-800 text-white border-none"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-sm">অথবা</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <button
             onClick={handleGoogleSignIn}
              type="button"
              className="btn bg-transparent border-gray-200 w-full"
            >
              Google দিয়ে চালিয়ে যান
            </button>

            <button
            onClick={handleGithubSignIn}
              type="button"
              className="btn bg-transparent border-gray-200 w-full mt-2"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
            <br/>
            <Link href={'/signin'}>
            <button className="btn bg-transparent border-gray-200 w-full mt-2">Sign In Page</button>
            </Link>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
