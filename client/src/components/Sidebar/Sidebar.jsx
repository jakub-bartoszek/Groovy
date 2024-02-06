import { useEffect, useRef, useState } from "react";
import { Resizable } from "re-resizable";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import Library from "./Library/Library";

const Sidebar = ({ accessToken }) => {
 const [width, setWidth] = useState();
 const sidebarRef = useRef();
 const snap = Array.from({ length: 136 }, (_, index) => 285 + index);

 useEffect(() => {
  const element = sidebarRef.current;
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

 const calculateMaxWidth = () => {
  if (window.innerWidth >= 1000) return "420px";
  if (window.innerWidth < 1000 && window.innerWidth >= 820) return "300px";
  return "70px";
 };

 return (
  <Resizable
   className="h-full overflow-hidden"
   snapGap={150}
   minWidth="70px"
   snap={{ x: [70, ...snap] }}
   maxWidth={calculateMaxWidth()}
   defaultSize={{ width: "300px", height: "100%" }}
  >
   <div
    className="h-full grid grid-flow-row grid-rows-[auto_1fr] gap-2 overflow-hidden"
    ref={sidebarRef}
   >
    <nav
     className={`py-4 px-[19px] flex flex-col rounded-[10px] gap-4 font-bold bg-[#121212] text-[#b3b3b3] ${
      width <= 70 && "items-center"
     }`}
    >
     <NavLink
      className="flex gap-4 items-center"
      to="/home"
     >
      <div className="h-8 w-8 flex items-center justify-center">
       <HomeIcon size={22} />
      </div>
      {width > 70 && <span>Home</span>}
     </NavLink>
     <NavLink
      className="flex gap-4 items-center"
      to="/search"
     >
      <div className="h-8 w-8 flex items-center justify-center">
       <SearchIcon size={22} />
      </div>
      {width > 70 && <span>Search</span>}
     </NavLink>
    </nav>
    <Library
     accessToken={accessToken}
     width={width}
    />
   </div>
  </Resizable>
 );
};

export default Sidebar;
