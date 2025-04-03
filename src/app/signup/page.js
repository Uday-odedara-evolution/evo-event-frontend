import SignUpForm from "./components/SignUpForm";

export const metadata = {
  title: "Sign Up",
};

export default function Signup() {
  return (
    <div className="h-[100vh] bg-[#FFF1EA]">
      <div className="flex h-full flex-1 items-center justify-center">
        <div className="flex flex-col gap-3">
          <div className="text-center text-[32px] lg:text-[40px]">
            <span>Sign in to</span>
            <span className="ms-2 text-[#FD5900]">
              <span className="font-bold">Evo</span>
              <span className="italic">Event</span>
            </span>
          </div>
          <div className="text-center text-[16px] whitespace-pre-line text-[#06060680] lg:text-[20px]">
            <span>{`Welcome to evento please enter your \n login details below`}</span>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
