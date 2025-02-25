import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GoogleIcon from "@/assets/google.ico";
import BannerImage from "@/assets/account-banner.png";

import { BeatLoader as Loading } from "react-spinners";
import { FaEye as ShowPasswordIcon } from "react-icons/fa";
import { LuChevronRight as RightArrowIcon } from "react-icons/lu";
import { IoMdAlert as AlertIcon } from "react-icons/io";

interface UserFormProps {
  formType: "LOGIN" | "SIGNUP";
}

interface LoginResponse {
  accessToken: string;
}

interface SignupResponse {
  accessToken: string;
}

export function UserForm({ formType }: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!errorMessage) return;

    const timeoutId = setTimeout(() => setErrorMessage(""), 4000);

    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      if (formType === "SIGNUP") {
        const payload = {
          email,
          password,
          fullName,
        };

        const { data } = await axios.post<SignupResponse>(
          "/api/users",
          payload,
        );

        localStorage.setItem("ACCESS_TOKEN", data.accessToken);
        window.location.href = "/chat";
      }
      if (formType === "LOGIN") {
        const payload = {
          email,
          password,
        };

        const { data } = await axios.post<LoginResponse>("/api/auth", payload);

        localStorage.setItem("ACCESS_TOKEN", data.accessToken);
        window.location.href = "/chat";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-screen max-w-[1000px] items-center px-5 py-4">
      <div className="flex w-full flex-col items-center md:flex-row md:justify-evenly lg:justify-between">
        <div className="md:w-[300px] lg:w-[450px]">
          <div className="my-6 flex flex-col gap-2 text-center md:text-start">
            <h1 className="text-3xl font-semibold text-gray-800">
              {formType === "SIGNUP"
                ? "Enjoy with MysterioMessagez"
                : "Continue to your Account"}
            </h1>
            <h2 className="text-gray-500">
              {formType === "SIGNUP"
                ? "Real-time communication 🚀"
                : "Welcome back 👋🏻"}
            </h2>
          </div>
          <button className="mx-auto my-6 flex w-full items-center justify-center gap-1 rounded-full border-2 border-purple-200 bg-purple-200 px-5 py-3 text-purple-700 duration-300 ease-in-out hover:bg-transparent md:mx-0">
            <img src={GoogleIcon} alt="Google Icon" />
            <span>
              {formType === "SIGNUP" ? "Sign up" : "Log in"} with Google
            </span>
          </button>
          <div className="flex items-center gap-2 ">
            <div className="h-[1px] grow bg-gray-300"></div>
            <p className="text-gray-500">Or use Email</p>
            <div className="h-[1px] grow bg-gray-300"></div>
          </div>
          {errorMessage ? (
            <div className="my-2 flex w-full items-center gap-2 rounded-lg bg-red-500 p-2 text-white">
              <AlertIcon size={25} className="flex-shrink-0" />
              {errorMessage}
            </div>
          ) : null}
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
                  email ? "top-0 translate-y-0" : "top-1/2 -translate-y-1/2"
                }`}
                htmlFor="email"
              >
                Email
              </label>
            </div>
            {formType === "SIGNUP" ? (
              <div className="relative flex flex-col-reverse">
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  id="fullName"
                  className="peer rounded-md border-2 border-purple-700 bg-gray-100 px-2 py-4 outline-none duration-300 ease-in-out focus:bg-purple-100"
                  type="text"
                />
                <label
                  className={`absolute left-2 z-10 text-sm text-purple-700 duration-300 ease-in-out peer-focus:top-0 peer-focus:translate-y-0 ${
                    fullName
                      ? "top-0 translate-y-0"
                      : "top-1/2 -translate-y-1/2"
                  }`}
                  htmlFor="fullName"
                >
                  Full Name
                </label>
              </div>
            ) : null}
            <div className="relative flex flex-col-reverse">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="peer z-0 rounded-md border-2 border-purple-700 bg-gray-100 px-2 py-4 outline-none duration-300 ease-in-out focus:bg-purple-100"
                type={showPassword ? "text" : "password"}
              />
              <label
                className={`absolute left-2 z-10 text-sm text-purple-700 duration-300 ease-in-out peer-focus:top-0 peer-focus:translate-y-0 ${
                  password ? "top-0 translate-y-0" : "top-1/2 -translate-y-1/2"
                }`}
                htmlFor="password"
              >
                Password
              </label>
              {password ? (
                <ShowPasswordIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-lg text-gray-700"
                />
              ) : null}
            </div>
            <button className="group flex h-[3.75rem] items-center justify-center rounded-md bg-purple-700 px-3 py-4 text-white">
              {loading ? (
                <Loading color="#fff" />
              ) : (
                <>
                  <span className="text-lg">
                    {formType === "SIGNUP" ? "Sign up" : "Log in"}
                  </span>
                  <RightArrowIcon className="relative text-2xl duration-300 ease-in-out group-hover:translate-x-2" />
                </>
              )}
            </button>
          </form>
          <p className="my-2 text-center text-sm text-gray-500">
            <span>
              {formType === "LOGIN"
                ? "Dont have an account? "
                : "Already have an account? "}
            </span>
            <Link
              to={formType === "LOGIN" ? "/signup" : "/login"}
              className="font-semibold underline"
            >
              {formType === "LOGIN" ? "Get Started" : "Log in"}
            </Link>
          </p>
        </div>
        <div className="hidden md:block">
          <img
            src={BannerImage}
            className="h-[525px] w-[350px] rounded-lg"
            alt="Banner Image"
          />
        </div>
      </div>
    </main>
  );
}
