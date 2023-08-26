import { Navigate } from "react-router-dom";

const Login = () => {
  const url = `https://sanjairocky.github.io/auth/`;
  const params = new URLSearchParams();
  params.append("response_type", "id_token");
  params.append("client_id", "Yardify 1.0.0");
  params.append(
    "redirect_uri",
    `${window.location.origin}/${
      window.location.origin.startsWith("https://sanjairocky.github.io")
        ? "yardify"
        : ""
    }#/login`
  );
  params.append("scope", "create delete");
  params.append("state", "xcoiv98y3md22vwsuye3kch");

  if (window.location.href.includes("id_token")) {
    const id_token = window.location.href.split("id_token=")[1];
    sessionStorage.setItem("token", id_token);
    return <Navigate to="/d/home" />;
  }
  if (!sessionStorage.getItem("token")) {
    window.location.href = `${url}?${params.toString()}`;
  } else {
    return <Navigate to="/d/home" />;
  }
};

export default Login;
