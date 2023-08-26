import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    sessionStorage.clear();
    window.location.replace("https://sanjairocky.github.io/auth/?logout=true");
  }, []);
};

export default Logout;
