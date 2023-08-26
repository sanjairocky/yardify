import { Navigate, useOutlet } from "react-router-dom";
import { AppProvider } from "../context/AppContext";

const App = () => {
  const outlet = useOutlet();

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <AppProvider
      value={{
        user: window.atob(sessionStorage.getItem("token").split(".")[1]),
        page: {},
      }}
    >
      {outlet ? outlet : <Navigate to="login" />}
    </AppProvider>
  );
};

export default App;
