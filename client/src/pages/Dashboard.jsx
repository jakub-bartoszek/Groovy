import { Sidebar } from "../components/Sidebar/Sidebar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Search } from "../components/Search/Search";
import { Player } from "../components/Player";
import { Home } from "../components/Home/Home";
import { Playlist } from "../components/Playlist/Playlist";
import { Artist } from "../components/Artist/Artist";
import { AccountBar } from "../components/AccountBar/AccountBar";
import { useEffect, useRef, useState } from "react";
import useAuth from "../utils/useAuth";
import { LikedSongs } from "../components/Playlist/LikedSongs";
import { useDispatch } from "react-redux";
import { fetchRecentlyPlayed } from "../utils/redux/homeSlice";

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
  <div className="overflow-hidden w-screen max-w-screen h-screen max-h-screen">
   <BrowserRouter>
    <div
     className={`grid grid-cols-[auto_2fr] h-full w-full ${
      window.innerWidth > 767 ? "grid-rows-[1fr_80px]" : "grid-rows-[1fr_150px]"
     } gap-2 bg-[black] p-2`}
    >
     <Sidebar accessToken={accessToken} />
     <div
      ref={contentWrapperRef}
      className="flex flex-col h-[100%] overflow-hidden rounded-xl relative"
     >
      <AccountBar
       width={width}
       accessToken={accessToken}
      />
      <Routes>
       <Route
        path="/artists/:id"
        element={
         <Artist
          width={width}
          accessToken={accessToken}
         />
        }
       />
       <Route
        path="/playlists/:id"
        element={
         <Playlist
          width={width}
          accessToken={accessToken}
         />
        }
       />
       <Route
        path="/liked"
        element={
         <LikedSongs
          width={width}
          accessToken={accessToken}
         />
        }
       />
       <Route
        path="/search"
        element={
         <Search
          width={width}
          accessToken={accessToken}
         />
        }
       />
       <Route
        path="/home"
        element={
         <Home
          width={width}
          accessToken={accessToken}
         />
        }
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
