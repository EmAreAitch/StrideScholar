import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import cs from "../LoginPage.module.css";
import imagepng from "~/assets/AuthImages/Image1.png";
import { usersSessions, usersRegistrations, usersPasswords } from "~/api";
import { dashboard } from "~/api";

export default function SessionNew() {
  const form = useForm({
    email: "",
    password: "",
    remember_me: false,
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.transform((data) => ({ user: data }));
    form.post(usersSessions.create.path());
  };

  return (
    <>
      <Head title="Log in" />
      <div
        className={
          cs["background-animate"] +
          " relative flex min-h-[500px] rounded-md gap-28 p-10 text-white bg-gradient-to-r from-violet-500 via-blue-500 to-blue-500"
        }
      >
       
        <div className="flex-1 flex justify-center items-center relative z-10">
          <img
            className="mix-blend-multiply object-fit w-full bottom-3 cursor-pointer brightness-110"
            src={imagepng}
            alt="img"
          />
        </div>

        {/* Right section with login form */}
        <div className="flex-1 flex justify-center items-center bg-white p-8 h-screen">
          <div className="w-full max-w-md">
            <h2 className="text-6xl font-bold text-gray-800 mb-6 text-left">
              Welcome Back!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="field mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => setData("email", e.target.value)}
                  autoFocus
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-2">
                    {errors.email.join(", ")}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="field mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={data.password}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => setData("password", e.target.value)}
                  autoComplete="current-password"
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-2">
                    {errors.password.join(", ")}
                  </div>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="remember_me"
                    checked={data.remember_me}
                    onChange={(e) => setData("remember_me", e.target.checked)}
                    className="mr-2"
                  />
                  Remember me
                </label>
                <Link href={usersPasswords.new.path()} className="text-blue-500 hover:underline block">Forgot your password?</Link>   
              </div>

              {/* Submit Button */}
              <div className="actions">
                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors ${
                    processing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {processing ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm">
              Don’t Have an Account?{" "}
              <Link href={usersRegistrations.new.path()} className="text-blue-500 hover:underline block">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
