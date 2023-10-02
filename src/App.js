import { useEffect } from "react";
import Login from "./pages/Login";
import DashBoard from "./pages/Dashboard";
import { selectToken } from "./utils/spotifyDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./utils/spotifyDataSlice";
import { BrowserRouter, HashRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Search } from "./components/Search";
import { Playlists } from "./components/Playlists";

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
  }, [token, dispatch]);

  return (
    <div className="bg-black">
      {token
        ? <div className="grid grid-cols-[420px_auto] gap-2 p-2">
          <BrowserRouter>
            <Sidebar/>
            <Routes>
              <Route path="/search" element={<Search token={token} />} />
              <Route
                path={`/access_token=${token}&token_type=Bearer&expires_in=3600`}
                element={<Navigate to="/" />}
              />
              <Route path="/" element={<DashBoard />} />
            </Routes>

          </BrowserRouter>
        </div>
        : <Login />}
    </div>

  );
}