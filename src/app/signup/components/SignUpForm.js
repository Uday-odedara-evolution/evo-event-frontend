"use client";
import APICall from "@/utils/ApiCall";
import { eventEmitter } from "@/utils/EventEmitter";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const handleShowPassword = () => {
  //   const el = document.getElementById("pass-input");

  //   if (el.type === "password") {
  //     el.type = "text";
  //   } else {
  //     el.type = "password";
  //   }
  // };

  const checkError = field => {
    const isAvailable = Object.hasOwn(errors, field);
    console.log("isAvailable", field, isAvailable);

    return !!isAvailable;
  };

  const handleSignup = data => {
    let redirectLink = null;
    const { email, password, username } = data;
    const payload = {
      email,
      password,
      username,
    };

    eventEmitter.dispatch("loader", true);

    APICall.post("/user", payload)
      .then(res => {
        console.log("res", res);

        redirectLink = "/login";
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
        <div className="text-[#06060680]">Username</div>
        <div>
          <input
            className="w-full rounded-[12px] border-1 border-[#06060620] bg-white px-[16px] py-[8px] outline-0"
            type="text"
            placeholder="John_doe"
            {...register("username", {
              required: "Please enter your username",
            })}
          />
        </div>
        {checkError("username") && (
          <div className="font-sans text-[12px] text-[#FF000080] lg:text-[12px]">
            {errors?.username?.message}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-[#06060680]">Email address</div>
        <div>
          <input
            className="w-full rounded-[12px] border-1 border-[#06060620] bg-white px-[16px] py-[8px] outline-0"
            type="text"
            placeholder="Ex. jhondoe@mailsample.com"
            {...register("email", {
              required: "Please enter your email address",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
        </div>
        {checkError("email") && (
          <div className="font-sans text-[12px] text-[#FF000080] lg:text-[12px]">
            {errors?.email?.message}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-[16px] text-[#06060680]">Password</div>
        <div className="relative">
          <input
            className="w-full rounded-[12px] border-1 border-[#06060620] bg-white px-[16px] py-[8px] outline-0"
            type="password"
            placeholder="* * * * *"
            id="pass-input"
            {...register("password", {
              required: "Enter your password",
            })}
          />
          {checkError("password") && (
            <div className="font-sans text-[12px] text-[#FF000080] lg:text-[12px]">
              {errors?.password?.message}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-[16px] text-[#06060680]">Confirm password</div>
        <div className="relative">
          <input
            className="w-full rounded-[12px] border-1 border-[#06060620] bg-white px-[16px] py-[8px] outline-0"
            type="password"
            placeholder="* * * * *"
            id="pass-input"
            {...register("confirm_password", {
              required: "Enter your password again",
              validate: val => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          {/* <button
            onClick={handleShowPassword}
            className="absolute top-0 right-0 bottom-0 flex cursor-pointer items-center pe-2"
          >
            <EyeIcon />
          </button> */}
          {checkError("confirm_password") && (
            <div className="font-sans text-[12px] text-[#FF000080] lg:text-[12px]">
              {errors?.confirm_password?.message}
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={handleSubmit(handleSignup)}
          className="gradient-bg btn-hover-2 h-[48px] w-full cursor-pointer font-medium text-[white]"
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default SignUpForm;
