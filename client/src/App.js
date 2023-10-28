import Login from "./pages/Login";
import DashBoard from "./pages/Dashboard";
import { selectToken } from "./utils/spotifyDataSlice";
import { useSelector } from "react-redux";
import useAuth from "./utils/useAuth";


export const code = new URLSearchParams(window.location.search).get('code');

export default function App() {

  const token = useSelector(selectToken);

  useAuth(code);
  return (
    <div className=" overflow-hidden h-screen">
      {token
        ? <DashBoard token={token} />
        : <Login code={code} />
      }
    </div>

  );
};