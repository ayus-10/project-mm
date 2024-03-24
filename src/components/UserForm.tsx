"use client";

import Image from "next/image";
import Link from "next/link";
import BannerImage from "../assets/account-banner.png";
import MainLogo from "../assets/logo.svg";
import GoogleIcon from "../assets/google.ico";
import { FormEvent, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { FaEye } from "react-icons/fa";

type UserFormProps = {
  type: "login" | "signup";
};

export default function UserForm({ type }: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <div
            className={`my-6 flex gap-2 text-center md:text-start ${
              type === "signup" ? "flex-col" : "flex-col-reverse"
            }`}
          >
            <h1 className="text-3xl text-gray-800 font-semibold">
              {type === "signup"
                ? "Enjoy with Mansiaa Chating App"
                : "Continue to your Account"}
            </h1>
            <h2 className="text-gray-500">
              {type === "signup"
                ? "Real-Time communication"
                : "Welcome back 👋🏻"}
            </h2>
          </div>
          <button className="flex my-6 w-full justify-center items-center gap-1 md:mx-0 mx-auto text-purple-700 ease-in-out duration-300 hover:bg-transparent border-2 border-purple-200 bg-purple-200 px-5 rounded-full py-3">
            <Image src={GoogleIcon} alt="Google Icon"></Image>
            <span>{`${
              type === "signup" ? "Sign up" : "Log in"
            } with Google`}</span>
          </button>
          <div className="flex items-center gap-2 ">
            <div className="grow h-[1px] bg-gray-300"></div>
            <p className="text-gray-500">Or use Email</p>
            <div className="grow h-[1px] bg-gray-300"></div>
          </div>
          <form className="flex my-6 flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col-reverse relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="outline-none peer border-2 focus:bg-purple-100 ease-in-out duration-300 rounded-md bg-gray-100 py-4 px-2 border-purple-700"
                type="email"
              />
              <label
                className={`absolute peer-focus:translate-y-0 peer-focus:top-0 ease-in-out duration-300 text-sm text-purple-700 z-10 left-2 ${
                  email === ""
                    ? "-translate-y-1/2 top-1/2"
                    : "translate-y-0 top-0"
                }`}
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <div className="flex flex-col-reverse relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="outline-none peer border-2 focus:bg-purple-100 ease-in-out duration-300 z-0 rounded-md bg-gray-100 py-4 px-2 border-purple-700"
                type={showPassword ? "text" : "password"}
              />
              <label
                className={`absolute peer-focus:translate-y-0 peer-focus:top-0 ease-in-out duration-300 text-sm text-purple-700 z-10 left-2 ${
                  password === ""
                    ? "-translate-y-1/2 top-1/2"
                    : "translate-y-0 top-0"
                }`}
                htmlFor="password"
              >
                Password
              </label>
              {password !== "" && (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 cursor-pointer text-gray-700 text-lg z-10 -translate-y-1/2 top-1/2"
                />
              )}
            </div>
            <button className="bg-purple-700 group justify-center flex items-center text-white py-4 px-3 rounded-md">
              <span className="text-lg">
                {type === "signup" ? "Sign up" : "Log in"}
              </span>
              <LuChevronRight className="group-hover:translate-x-2 relative text-2xl ease-in-out duration-300" />
            </button>
          </form>
          <p
            className={`text-gray-500 text-xs ${
              type === "signup" ? "block" : "hidden"
            }`}
          >
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
            <span>
              {type === "signup"
                ? "Already have an account? "
                : "Dont have an account? "}
            </span>
            <Link
              href={type === "signup" ? "/login" : "/signup"}
              className="underline font-semibold"
            >
              {type === "signup" ? "Log in" : "GET STARTED - IT'S FREE"}
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
