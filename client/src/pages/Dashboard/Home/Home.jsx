import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectRecentlyPlayed, selectStatus } from "../../../utils/redux/homeSlice";
import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import Tile from "../../../components/Tile/Tile";
import Loader from "../../../components/Loader/Loader";
import Error from "../../../components/Error/Error";

const Home = ({ width }) => {
 const recentlyPlayed = useSelector(selectRecentlyPlayed);
 const scrollRef = useRef();
 const _ = require("lodash");
 const status = useSelector(selectStatus);

 switch (status) {
  case "loading":
   return <Loader />;
  case "error":
   return <Error />;
  case "success":
   return (
    <div
     className="@container h-full overflow-hidden relative rounded-[10px] text-white overflow-y-auto bg-[#121212]"
     ref={scrollRef}
    >
     <div className="pt-[72px] p-4 bg-gradient-to-b from-[#616161] via-[#242424] via-30% to-[#121212] to-60% h-full">
      <h1 className=" text-3xl font-bold py-6">Hello!</h1>
      <ul className="grid gap-4 font-semibold @2xl:grid-cols-3 @md:grid-cols-2 @sm:grid-cols-1">
       <NavLink to="/liked">
        <Tile
         key={nanoid()}
         width={width}
         name="Liked songs"
         imgSrc="https://misc.scdn.co/liked-songs/liked-songs-300.png"
        />
       </NavLink>
       {recentlyPlayed.map((track) => (
        <Tile
         key={track.id || nanoid()}
         track={track}
        />
       ))}
      </ul>
     </div>
    </div>
   );
  default:
   return null;
 }
};

export default Home;
