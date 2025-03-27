"use client";
import { EyeIcon } from "@/assets/svg";
import APICall from "@/utils/ApiCall";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleShowPassword = () => {
    const el = document.getElementById("pass-input");

    if (el.type === "password") {
      el.type = "text";
    } else {
      el.type = "password";
    }
  };

  const handleLogin = () => {
    let redirectLink = null;
    const payload = {
      email,
      password,
    };

    APICall.post("/auth/login", payload)
      .then((res) => {
        const userData = res?.data;
        localStorage.setItem("userdata", JSON.stringify(userData));

        redirectLink = "/dashboard";
      })
      .catch((err) => {})
      .finally(() => {
        if (redirectLink) {
          redirect(redirectLink);
        }
      });
  };

  return (
    <div className="h-[100vh] bg-[#FFF1EA]">
      <div className="flex flex-1 justify-center items-center h-full">
        <div className="flex flex-col gap-3">
          <div className="text-[32px] lg:text-[40px] text-center">
            <span>Sign in to</span>
            <span className="ms-2 text-[#FD5900] ">
              <span className="font-bold">Evo</span>
              <span className="italic">Event</span>
            </span>
          </div>
          <div className="text-[#06060680] text-[16px] lg:text-[20px] whitespace-pre-line text-center">
            <span>{`Welcome to evento please enter your \n login details below`}</span>
          </div>
          <div className="flex gap-0.5 flex-col">
            <div className="text-[#06060680]">Email address</div>
            <div>
              <input
                className="bg-white border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620] outline-0"
                type="text"
                placeholder="Ex. jhondoe@mailsample.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-0.5 flex-col">
            <div className="text-[#06060680] text-[16px]">Password</div>
            <div className="relative">
              <input
                className="bg-white border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620] outline-0"
                type="password"
                placeholder="* * * * *"
                id="pass-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleShowPassword}
                className="absolute top-0 right-0 bottom-0 flex items-center pe-2 cursor-pointer"
              >
                <EyeIcon />
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex">
              <input
                className="bg-white cursor-pointer accent-[#FD5900] border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620] outline-0"
                type="checkbox"
              />
            </div>
            <div className="ms-2 text-[#06060680] text-[16px]">Remember me</div>
          </div>
          <div>
            <button
              onClick={handleLogin}
              className="gradient-bg h-[48px] w-full cursor-pointer font-medium text-[white]"
            >
              Log in
            </button>
          </div>
          <div className="text-center text-[16px] underline">
            <span className="cursor-pointer">Forgot the password ?</span>
          </div>
        </div>
      </div>
    </div>
  );
}
