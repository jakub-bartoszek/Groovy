import { useEffect } from "react";
import Login from "./pages/Login";
import DashBoard from "./pages/Dashboard";
import { selectToken } from "./utils/spotifyDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./utils/spotifyDataSlice";

export default function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();


  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split('=')[1];
      dispatch(setToken(token))
    }
  }, [token, dispatch]);
  return (

    <div>{token ? <DashBoard /> : <Login />}</div>
  );
}