import { useEffect } from "react";
import Login from "./pages/Login";
import DashBoard from "./pages/Dashboard";
import { selectToken } from "./utils/spotifyDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./utils/spotifyDataSlice";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();


  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split('=')[1];
      dispatch(setToken(token));
    }
    if (token) { localStorage.setItem("token", JSON.stringify(token)); }
    console.log(`/access_token=${token}&token_type=Bearer&expires_in=3600`);
  }, [token, dispatch]);

  return (
    <>
      {token
        ? <HashRouter>
          <Routes>
            <Route
              path={`/access_token=${token}&token_type=Bearer&expires_in=3600`}
              element={<Navigate to="/" />}
            />
            <Route path="/" element={<DashBoard />} />
          </Routes>
        </HashRouter>
        : <Login />}
    </>

  );
}