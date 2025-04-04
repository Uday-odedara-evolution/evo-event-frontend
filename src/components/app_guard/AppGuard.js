"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AppGuard = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const userDataString = localStorage.getItem("userdata");
    const userData = JSON.parse(userDataString);
    console.log("userData", userData);
    if (userData) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
    setIsVerified(true);
  }, [router]);

  if (isVerified) {
    return children;
  }

  return null;
};

export default AppGuard;
