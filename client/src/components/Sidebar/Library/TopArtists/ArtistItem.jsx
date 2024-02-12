import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";

const ArtistItem = ({ item, path }) => (
 <li key={item.id || nanoid()}>
  <NavLink to={path}>
   <div className="flex items-center gap-2 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer playlist">
    <div className="h-11 w-11 rounded-full bg-[#282828] flex items-center justify-center relative">
     {item.images[0] && (
      <img
       className="h-11 w-11 rounded-full absolute"
       alt={item.name}
       src={item?.images[item.images.length - 1]?.url}
      />
     )}
    </div>

    <div className="flex-col hidden @[71px]:flex">
     <span className="font-semibold text-white">{item.name}</span>
     <span className="text-sm">Artist</span>
    </div>
   </div>
  </NavLink>
 </li>
);

export default ArtistItem;
