"use client";
import { EyeIcon } from "@/assets/svg";
import APICall from "@/utils/ApiCall";
import { eventEmitter } from "@/utils/EventEmitter";
import { redirect } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
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

    eventEmitter.dispatch("loader", true);
    APICall.post("/auth/login", payload)
      .then(res => {
        const userData = res?.data;
        localStorage.setItem("userdata", JSON.stringify(userData));

        redirectLink = "/dashboard";
      })
      .catch(() => {})
      .finally(() => {
        eventEmitter.dispatch("loader", false);

        if (redirectLink) {
          redirect(redirectLink);
        }
      });
  };
  return (
    <>
      <div className="flex flex-col gap-0.5">
        <div className="text-[#06060680]">Email address</div>
        <div>
          <input
            className="w-full rounded-[12px] border-2 border-[#06060620] bg-white px-[16px] py-[8px] outline-0"
            type="text"
            placeholder="Ex. jhondoe@mailsample.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-[16px] text-[#06060680]">Password</div>
        <div className="relative">
          <input
            className="w-full rounded-[12px] border-2 border-[#06060620] bg-white px-[16px] py-[8px] outline-0"
            type="password"
            placeholder="* * * * *"
            id="pass-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={handleShowPassword}
            className="absolute top-0 right-0 bottom-0 flex cursor-pointer items-center pe-2"
          >
            <EyeIcon />
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex">
          <input
            className="w-full cursor-pointer rounded-[12px] border-2 border-[#06060620] bg-white px-[16px] py-[8px] accent-[#FD5900] outline-0"
            type="checkbox"
          />
        </div>
        <div className="ms-2 text-[16px] text-[#06060680]">Remember me</div>
      </div>
      <div>
        <button
          onClick={handleLogin}
          className="gradient-bg btn-hover-2 h-[48px] w-full cursor-pointer font-medium text-[white]"
        >
          Log in
        </button>
      </div>
    </>
  );
};

export default LoginForm;
