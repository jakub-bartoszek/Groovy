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

const AccountBar = ({ accessToken, width }) => {
 const bgColor = useSelector(selectBgColor);
 const opacity = useSelector(selectOpacity);
 const navigate = useNavigate();

 const handleGoBack = () => navigate(-1);

 return (
  <div
   className={`gap-3 px-5 items-center w-full absolute top-0 h-[72px] z-10 text-white
	 ${window.innerWidth > 500 ? "grid grid-cols-[auto_1fr_auto_auto_auto]" : "grid grid-cols-[auto_1fr_auto]"}`}
   style={{
    backgroundColor: `rgba(${bgColor?.R}, ${bgColor?.G}, ${bgColor?.B}, ${opacity})`,
    transition: "background-color 0.1s linear"
   }}
  >
   <AccountBarButton
    icon={<LeftArrowIcon size={18} />}
    onClick={handleGoBack}
   />
   <div>{window.location.href.includes("search") && <SearchBar accessToken={accessToken} />}</div>
   {window.innerWidth > 500 && (
    <>
     <AccountBarButton
      className={width < 700 ? "w-8" : "px-4"}
      text={width > 700 ? "Download app" : <DownloadIcon className="h-6" />}
     />
     <AccountBarButton icon={<BellIcon className="h-6" />} />
    </>
   )}
   <div
    className="group relative cursor-pointer"
    tabIndex={1}
   >
    <AccountBarButton className="h-8 w-8" />
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
