import LoginForm from "./login_form/LoginForm";

export const metadata = {
  title: "Login",
};

export default function Login() {
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
          <LoginForm />
          <div className="text-center text-[16px] underline">
            <span className="cursor-pointer">Forgot the password ?</span>
          </div>
        </div>
      </div>
    </div>
  );
}
