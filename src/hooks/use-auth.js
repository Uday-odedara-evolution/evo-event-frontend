import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const [userData, setUserData] = useState(null);

  function checkAuth() {
    const userDataString = localStorage.getItem("userdata");
    const data = JSON.parse(userDataString);

    console.log(data);
    if (!data) return redirect("/login");

    setUserData(data);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return userData;
}
