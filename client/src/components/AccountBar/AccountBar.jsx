import { selectBgColor, selectOpacity } from "../../utils/redux/colorsSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftArrowIcon } from "../../assets/icons/LeftArrowIcon";
import SearchBar from "./SearchBar";
import BellIcon from "@heroicons/react/outline/BellIcon";
import DownloadIcon from "@heroicons/react/outline/DownloadIcon";

const AccountBarButton = ({ icon, onClick, className, text }) => (
 <button
  className={`h-8 bg-[#000000aa] text-muted rounded-full flex items-center justify-center hover:scale-105 hover:text-white ${className}`}
  onClick={onClick}
 >
  {icon ? icon : text}
 </button>
);

const DropdownItem = ({ text, onClick }) => (
 <li>
  <button
   className="hover:bg-[#3e3e3e] p-3 w-full text-left rounded-t-[10px]"
   onClick={onClick}
  >
   {text}
  </button>
 </li>
);

const AccountBar = ({ accessToken }) => {
 const bgColor = useSelector(selectBgColor);
 const opacity = useSelector(selectOpacity);
 const navigate = useNavigate();

 const handleGoBack = () => navigate(-1);

 return (
  <div
   style={{
    backgroundColor: `rgba(${bgColor?.R}, ${bgColor?.G}, ${bgColor?.B}, ${opacity})`,
    transition: "background-color 0.1s linear"
   }}
   className="gap-3 px-5 grid items-center w-full absolute top-0 h-[72px] z-10 text-white grid-cols-[auto_1fr_auto] @md:grid-cols-[auto_1fr_auto_auto_auto]"
  >
   <AccountBarButton
    className="w-8"
    icon={<LeftArrowIcon size={20} />}
    onClick={handleGoBack}
   />
   <div>{window.location.href.includes("search") && <SearchBar accessToken={accessToken} />}</div>
   <>
    <AccountBarButton
     className="items-start hidden @2xl:flex"
     text={<span className="px-4">Download app</span>}
    />
    <AccountBarButton
     className="w-8 items-start hidden @md:flex @2xl:hidden"
     icon={<DownloadIcon className="h-6 w-8" />}
    />
    <AccountBarButton
     className="w-8 hidden @md:flex"
     icon={<BellIcon className="h-6" />}
    />
   </>

   <div
    className="group relative cursor-pointer"
    tabIndex={1}
   >
    <AccountBarButton className="w-8" />
    <ul className="absolute right-0 top-10 w-56 bg-[#282828] text-sm p-1 rounded-[10px] hidden group-focus-within:block scale-100 z-20">
     <DropdownItem text="Account" />
     <DropdownItem text="Profile" />
     <DropdownItem text="Help" />
     <DropdownItem text="Download" />
     <DropdownItem text="Settings" />
     <DropdownItem
      text="Logout"
      onClick={() => (window.location = `/`)}
     />
    </ul>
   </div>
  </div>
 );
};

export default AccountBar;
