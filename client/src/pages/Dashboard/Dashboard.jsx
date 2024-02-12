import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../utils/useAuth";
import { fetchRecentlyPlayed } from "../../utils/redux/homeSlice";
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "./Search/Search";
import Home from "./Home/Home";
import Playlist from "./Playlist/Playlist";
import LikedSongs from "./Playlist/LikedSongs";
import Artist from "./Artist/Artist";
import AccountBar from "../../components/AccountBar/AccountBar";
import Player from "../../components/Player/Player";

const Dashboard = ({ code }) => {
const [width, setWidth] = useState();
 const contentWrapperRef = useRef();
 const accessToken = useAuth(code);
 const dispatch = useDispatch();

 useEffect(() => {
  const element = contentWrapperRef.current;
  if (element) {
   const observer = new ResizeObserver(() => {
    setWidth(element.offsetWidth);
   });
   observer.observe(element);
   return () => {
    observer.disconnect();
   };
  }
 }, [width]);

 useEffect(() => {
  if (accessToken) {
   dispatch(fetchRecentlyPlayed(accessToken));
  }
 }, [accessToken]);

 return (
  <div className="@container overflow-hidden w-screen max-w-screen h-[100dvh] max-h-[100dvh]">
   <BrowserRouter>
    <div className="grid grid-cols-[auto_2fr] h-full w-full gap-2 bg-[black] p-2 grid-rows-[1fr_150px] @[767px]:grid-rows-[1fr_80px]">
     <Sidebar accessToken={accessToken} />
     <div
      ref={contentWrapperRef}
      className="@container flex flex-col h-[100%] rounded-xl relative overflow-hidden"
     >
      <AccountBar accessToken={accessToken} />
      <Routes>
       <Route
        path="/artists/:id"
        element={<Artist accessToken={accessToken} />}
       />
       <Route
        path="/playlists/:id"
        element={<Playlist accessToken={accessToken} />}
       />
       <Route
        path="/liked"
        element={<LikedSongs accessToken={accessToken} />}
       />
       <Route
        path="/search"
        element={<Search accessToken={accessToken} />}
       />
       <Route
        path="/home"
        element={<Home accessToken={accessToken} />}
       />
       <Route
        path="/"
        element={<Navigate to="/home" />}
       />
      </Routes>
     </div>
     <Player accessToken={accessToken} />
    </div>
   </BrowserRouter>
  </div>
 );
};

export default Dashboard;
