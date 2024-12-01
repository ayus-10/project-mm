import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/google.ico";
import BannerImage from "../assets/account-banner.png";
import fetchPost from "../requests/fetchPost";
import { API_URL } from "../config";
import { FaEye } from "react-icons/fa";
import { LuChevronRight } from "react-icons/lu";

const LOGIN = "login";
const SIGNUP = "signup";

interface UserFormProps {
  formType: typeof LOGIN | typeof SIGNUP;
}

interface LoginResponse {
  accessToken: string;
}

interface SignupResponse {
  accessToken: string;
}

export default function UserForm({ formType }: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let apiUrl = API_URL;

    if (!apiUrl) {
      console.error("API URL not found");
      return;
    }

    if (formType === LOGIN) {
      apiUrl += "/Auth";

      const res = await fetchPost<LoginResponse>(apiUrl, {
        Email: email,
        Password: password,
      });

      if (!res) {
        return;
      }

      const { error, data } = res;

      if (error) {
        alert(error);
      }

      if (data) {
        localStorage.setItem("ACCESS_TOKEN", data.accessToken);
        navigate("/chat");
      }

      return;
    }

    if (formType === SIGNUP) {
      apiUrl += "/Users";

      const res = await fetchPost<SignupResponse>(apiUrl, {
        Email: email,
        Password: password,
        FullName: fullName,
      });

      if (!res) {
        return;
      }

      const { error, data } = res;

      if (error) {
        alert(error);
      }

      if (data) {
        localStorage.setItem("ACCESS_TOKEN", data.accessToken);
        navigate("/chat");
      }

      return;
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-screen max-w-[1000px] items-center px-5 py-4">
      <div className="flex w-full flex-col md:flex-row md:justify-evenly lg:justify-between">
        <div className="md:w-[300px] lg:w-[450px]">
          <div className="my-6 flex flex-col gap-2 text-center md:text-start">
            <h1 className="text-3xl font-semibold text-gray-800">
              {formType === SIGNUP
                ? "Enjoy with MysterioMessagez"
                : "Continue to your Account"}
            </h1>
            <h2 className="text-gray-500">
              {formType === SIGNUP
                ? "Real-time communication 🚀"
                : "Welcome back 👋🏻"}
            </h2>
          </div>
          <button className="mx-auto my-6 flex w-full items-center justify-center gap-1 rounded-full border-2 border-purple-200 bg-purple-200 px-5 py-3 text-purple-700 duration-300 ease-in-out hover:bg-transparent md:mx-0">
            <img src={GoogleIcon} alt="Google Icon" />
            <span>
              {formType === SIGNUP ? "Sign up" : "Log in"} with Google
            </span>
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
                  email ? "top-0 translate-y-0" : "top-1/2 -translate-y-1/2"
                }`}
                htmlFor="email"
              >
                Email
              </label>
            </div>
            {formType === SIGNUP ? (
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
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-lg text-gray-700"
                />
              ) : null}
            </div>
            <button className="group flex items-center justify-center rounded-md bg-purple-700 px-3 py-4 text-white">
              <span className="text-lg">
                {formType === SIGNUP ? "Sign up" : "Log in"}
              </span>
              <LuChevronRight className="relative text-2xl duration-300 ease-in-out group-hover:translate-x-2" />
            </button>
          </form>
          <p className="my-2 text-center text-sm text-gray-500">
            <span>
              {formType === LOGIN
                ? "Dont have an account? "
                : "Already have an account? "}
            </span>
            <Link
              to={formType === LOGIN ? "/signup" : "/login"}
              className="font-semibold underline"
            >
              {formType === LOGIN ? "Get Started" : "Log in"}
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
