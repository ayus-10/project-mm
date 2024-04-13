"use client";

import Image from "next/image";
import Link from "next/link";
import BannerImage from "../assets/account-banner.png";
import MainLogo from "../assets/logo.svg";
import GoogleIcon from "../assets/google.ico";
import { FormEvent, useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { signIn } from "next-auth/react";

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
    <main className="mx-auto flex min-h-screen w-screen max-w-[1000px] items-center px-5 py-4">
      <div className="flex w-full flex-col md:flex-row md:justify-evenly lg:justify-between">
        <div className="md:w-[300px] lg:w-[450px]">
          <Image
            height={50}
            width={174}
            alt="Main Logo"
            className="mx-auto md:mx-0"
            priority
            src={MainLogo}
          ></Image>
          <div
            className={`my-6 flex gap-2 text-center md:text-start ${
              type === "signup" ? "flex-col" : "flex-col-reverse"
            }`}
          >
            <h1 className="text-3xl font-semibold text-gray-800">
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
          <button
            onClick={() => signIn("google")}
            className="mx-auto my-6 flex w-full items-center justify-center gap-1 rounded-full border-2 border-purple-200 bg-purple-200 px-5 py-3 text-purple-700 duration-300 ease-in-out hover:bg-transparent md:mx-0"
          >
            <Image src={GoogleIcon} alt="Google Icon"></Image>
            <span>{`${
              type === "signup" ? "Sign up" : "Log in"
            } with Google`}</span>
          </button>
          <div className="flex items-center gap-2 ">
            <div className="h-[1px] grow bg-gray-300"></div>
            <p className="text-gray-500">Or use Email</p>
            <div className="h-[1px] grow bg-gray-300"></div>
          </div>
          <form className="my-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="relative flex flex-col-reverse">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="peer rounded-md border-2 border-purple-700 bg-gray-100 px-2 py-4 outline-none duration-300 ease-in-out focus:bg-purple-100"
                type="email"
              />
              <label
                className={`absolute left-2 z-10 text-sm text-purple-700 duration-300 ease-in-out peer-focus:top-0 peer-focus:translate-y-0 ${
                  email === ""
                    ? "top-1/2 -translate-y-1/2"
                    : "top-0 translate-y-0"
                }`}
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <div className="relative flex flex-col-reverse">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="peer z-0 rounded-md border-2 border-purple-700 bg-gray-100 px-2 py-4 outline-none duration-300 ease-in-out focus:bg-purple-100"
                type={showPassword ? "text" : "password"}
              />
              <label
                className={`absolute left-2 z-10 text-sm text-purple-700 duration-300 ease-in-out peer-focus:top-0 peer-focus:translate-y-0 ${
                  password === ""
                    ? "top-1/2 -translate-y-1/2"
                    : "top-0 translate-y-0"
                }`}
                htmlFor="password"
              >
                Password
              </label>
              {password !== "" && (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-lg text-gray-700"
                />
              )}
            </div>
            <button className="group flex items-center justify-center rounded-md bg-purple-700 px-3 py-4 text-white">
              <span className="text-lg">
                {type === "signup" ? "Sign up" : "Log in"}
              </span>
              <LuChevronRight className="relative text-2xl duration-300 ease-in-out group-hover:translate-x-2" />
            </button>
          </form>
          <p
            className={`text-center text-xs text-gray-500 ${
              type === "signup" ? "block" : "hidden"
            }`}
          >
            <span>By Signing up, you agree to our </span>
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
            <span> and </span>
            <Link href="#" className="underline">
              Terms of Service
            </Link>
          </p>
          <p className="my-2 text-center text-sm text-gray-500">
            <span>
              {type === "signup"
                ? "Already have an account? "
                : "Dont have an account? "}
            </span>
            <Link
              href={type === "signup" ? "/login" : "/signup"}
              className="font-semibold underline"
            >
              {type === "signup" ? "Log in" : "GET STARTED - IT'S FREE"}
            </Link>
          </p>
        </div>
        <div className="hidden md:block">
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
