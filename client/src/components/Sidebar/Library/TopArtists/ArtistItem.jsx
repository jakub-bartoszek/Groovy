import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";

const ArtistItem = ({ item, width, path }) => (
 <li key={nanoid()}>
  <NavLink to={path}>
   <div
    className={`flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer playlist ${
     width <= 70 && "justify-center"
    }`}
   >
    <div className="h-11 w-11 rounded-full bg-[#282828] flex items-center justify-center relative">
     {item.images[0] && (
      <img
       className="h-11 w-11 rounded-full absolute"
       alt={item.name}
       src={item?.images[item.images.length - 1]?.url}
      />
     )}
    </div>
    {width > 70 && (
     <div className="flex flex-col">
      <span className="font-semibold text-white">{item.name}</span>
      <span className="text-sm">Artist</span>
     </div>
    )}
   </div>
  </NavLink>
 </li>
);

export default ArtistItem;
