"use client";

import Image from "next/image";
import Link from "next/link";
import BannerImage from "../../assets/account-banner.png";
import MainLogo from "../../assets/logo.svg";
import GoogleIcon from "../../assets/google.ico";
import { FormEvent, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { FaEye } from "react-icons/fa";

export default function signup() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <main className="w-screen flex items-center min-h-screen px-5 py-4 max-w-[1000px] mx-auto">
      <div className="flex w-full md:justify-evenly lg:justify-between md:flex-row flex-col">
        <div className="md:w-[300px] lg:w-[450px]">
          <Image
            height={50}
            width={174}
            alt="Main Logo"
            className="md:mx-0 mx-auto"
            priority
            src={MainLogo}
          ></Image>
          <div className="my-6 flex flex-col gap-2 text-center md:text-start">
            <h1 className="text-3xl text-gray-800 font-semibold">
              Enjoy with Mansiaa Chating App
            </h1>
            <h2 className="text-gray-500">Real-Time communication</h2>
          </div>
          <button className="flex my-6 items-center gap-1 md:mx-0 mx-auto text-purple-700 ease-in-out duration-300 hover:bg-transparent border-2 border-purple-200 bg-purple-200 px-5 rounded-full py-3">
            <Image src={GoogleIcon} alt="Google Icon"></Image>
            <span>Sign up with Google</span>
          </button>
          <div className="flex items-center gap-2 ">
            <div className="grow h-[1px] bg-gray-300"></div>
            <p className="text-gray-500">Or use Email</p>
            <div className="grow h-[1px] bg-gray-300"></div>
          </div>
          <form className="flex my-6 flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col-reverse relative">
              <input
                id="email"
                className="outline-none border-2 rounded-md bg-gray-100 py-4 px-3 border-purple-700"
                type="email"
              />
              <label
                className="absolute text-sm font-semibold text-purple-700 top-1 z-10 left-2"
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <div className="flex flex-col-reverse relative">
              <input
                id="password"
                className="outline-none border-2 z-0 rounded-md bg-gray-100 py-4 px-3 border-purple-700"
                type={showPassword ? "text" : "password"}
              />
              <label
                className="absolute text-sm font-semibold text-purple-700 top-1 z-10 left-2"
                htmlFor="password"
              >
                Password
              </label>
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 cursor-pointer text-gray-700 text-lg z-10 -translate-y-1/2 top-1/2"
              />
            </div>
            <button className="bg-purple-700 group justify-center flex items-center text-white py-4 px-3 rounded-md">
              <span className="text-lg">Sign up</span>
              <LuChevronRight className="group-hover:translate-x-2 relative text-2xl ease-in-out duration-300" />
            </button>
          </form>
          <p className="text-gray-500 text-xs">
            <span>By Signing up to uBrand, means you agree to our </span>
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
            <span> and </span>
            <Link href="#" className="underline">
              Terms of Service
            </Link>
          </p>
          <p className="text-gray-500 my-2 text-sm text-center">
            <span>Already have an account? </span>
            <Link href="/login" className="underline font-semibold">
              Log in
            </Link>
          </p>
        </div>
        <div className="md:block hidden">
          <Image
            height={600}
            width={400}
            priority
            src={BannerImage}
            alt="Banner Image"
          ></Image>
        </div>
      </div>
    </main>
  );
}
