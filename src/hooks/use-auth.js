import { useEffect, useState } from "react";

export function useAuth() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("userdata");
    const data = JSON.parse(userDataString);

    setUserData(data);
  }, []);

  return userData;
}
