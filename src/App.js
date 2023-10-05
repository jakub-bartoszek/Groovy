import { useEffect } from "react";
import Login from "./pages/Login";
import DashBoard from "./pages/Dashboard";
import { selectToken } from "./utils/spotifyDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./utils/spotifyDataSlice";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Search } from "./components/Search";
import useAuth from "./utils/useAuth";

export const code = new URLSearchParams(window.location.search).get('code');

export default function App() {
  const token = useSelector(selectToken);

  return (
    <div>
      {token
        ? <DashBoard token={token} />
        : <Login code={code} />
      }</div>

  );
};