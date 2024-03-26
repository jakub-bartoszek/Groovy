import { useEffect, useRef, useState } from "react";
import {
 fetchPlaylists,
 fetchTopArtists,
 fetchTopTracks,
 selectStatus
} from "../../../utils/redux/librarySlice";
import { useDispatch, useSelector } from "react-redux";
import { LibraryIcon } from "../../../assets/icons/LibraryIcon";
import { LeftArrowIcon } from "../../../assets/icons/LeftArrowIcon";
import { RightArrowIcon } from "../../../assets/icons/RightArrowIcon";
import { CrossIcon } from "../../../assets/icons/CrossIcon";
import Loader from "../../Loader/Loader";
import CategoryButton from "../../CategoryButton/CategoryButton";
import Playlists from "./Playlists/Playlists";
import TopTracks from "./TopTracks/TopTracks";
import TopArtists from "./TopArtists/TopArtists";
import Error from "../../Error/Error";

const LibraryCategoryButtons = ({ category, setCategory, libraryScrollPosition }) => {
 const [categoriesScrollPosition, setCategoriesScrollPosition] = useState("left");
 const contentWrapper = useRef(null);

 const renderCategoryButtons = () => {
  switch (category) {
   case "playlists":
    return (
     <CategoryButton
      category={category}
      setCategory={setCategory}
      name="Playlists"
     />
    );
   case "artists":
    return (
     <CategoryButton
      category={category}
      setCategory={setCategory}
      name="Artists"
     />
    );
   case "tracks":
    return (
     <CategoryButton
      category={category}
      setCategory={setCategory}
      name="Tracks"
     />
    );
   case "albums":
    return (
     <CategoryButton
      category={category}
      setCategory={setCategory}
      name="Albums"
     />
    );
   case "podcasts":
    return (
     <CategoryButton
      category={category}
      setCategory={setCategory}
      name="Podcasts"
     />
    );
   case "all":
    return (
     <>
      <CategoryButton
       category={category}
       setCategory={setCategory}
       name="Playlists"
      />
      <CategoryButton
       category={category}
       setCategory={setCategory}
       name="Artists"
      />
      <CategoryButton
       category={category}
       setCategory={setCategory}
       name="Tracks"
      />
      <CategoryButton
       category={category}
       setCategory={setCategory}
       name="Albums"
      />
      <CategoryButton
       category={category}
       setCategory={setCategory}
       name="Podcasts"
      />
     </>
    );

   default:
    return null;
  }
 };

 return (
  <div
   className={`relative items-center px-4 h-14 py-2 hidden @[71px]:flex
     ${libraryScrollPosition !== 0 && "shadow-bottom"}`}
  >
   <button
    className={`bg-[#242424] flex items-center justify-center h-8 w-8 rounded-full absolute left-4 shadow-left
      ${categoriesScrollPosition === "left" ? "hidden" : ""} ${category !== "all" && "hidden"}`}
    onClick={() => {
     setCategoriesScrollPosition("left");
     contentWrapper.current.scrollLeft -= 1000;
    }}
   >
    <LeftArrowIcon size={18} />
   </button>
   <button
    className={`bg-[#242424] flex items-center justify-center h-8 w-8 rounded-full absolute right-4 shadow-right
      ${categoriesScrollPosition === "right" ? "hidden" : ""} ${category !== "all" && "hidden"}`}
    onClick={() => {
     setCategoriesScrollPosition("right");
     contentWrapper.current.scrollLeft += 1000;
    }}
   >
    <RightArrowIcon size={18} />
   </button>
   <div
    className="gap-2 h-8 overflow-x-scroll hide-scrollbar scroll-smooth grid grid-flow-col"
    ref={contentWrapper}
   >
    {category !== "all" && (
     <button
      className="bg-[#242424] h-8 w-8 flex items-center justify-center rounded-full"
      onClick={() => setCategory("all")}
     >
      <CrossIcon size={18} />
     </button>
    )}
    {renderCategoryButtons()}
   </div>
  </div>
 );
};

const LibraryHeader = ({ category, setCategory, libraryScrollPosition }) => (
 <>
  <h2
   className={`flex items-center gap-4 py-4 px-[19px] font-bold ${
    libraryScrollPosition !== 0 && "shadow-bottom"
   }`}
  >
   <div className="w-8 h-8 flex items-center justify-center">
    <LibraryIcon size={22} />
   </div>
   <span className="hidden @[71px]:flex">Library</span>
  </h2>
  <LibraryCategoryButtons
   category={category}
   setCategory={setCategory}
   libraryScrollPosition={libraryScrollPosition}
  />
 </>
);

const Library = ({ accessToken }) => {
 const [libraryScrollPosition, setLibraryScrollPosition] = useState(0);
 const [category, setCategory] = useState("all");
 const status = useSelector(selectStatus);
 const dispatch = useDispatch();

 const handleScroll = (event) => {
  setLibraryScrollPosition(event.currentTarget.scrollTop);
 };

 useEffect(() => {
  if (accessToken) {
   dispatch(fetchPlaylists(accessToken));
   dispatch(fetchTopArtists(accessToken));
   dispatch(fetchTopTracks(accessToken));
  }
 }, [dispatch, accessToken]);

 const renderCategory = () => {
  switch (category) {
   case "playlists":
    return <> {/* <Playlists accessToken={accessToken} /> */}</>;
   case "tracks":
    return <TopTracks accessToken={accessToken} />;
   case "artists":
    return <TopArtists accessToken={accessToken} />;
   case "all":
    return (
     <>
      {/* <Playlists accessToken={accessToken} /> */}
      <TopTracks accessToken={accessToken} />
      <TopArtists accessToken={accessToken} />
     </>
    );
   default:
    return null;
  }
 };

 const renderItems = () => {
  switch (status) {
   case "loading":
    return <Loader />;
   case "error":
    return <Error />;
   case "success":
    return (
     <ul
      onScroll={handleScroll}
      className={`p-1 h-full overflow-y-scroll hide-scrollbar`}
     >
      {renderCategory()}
     </ul>
    );
   default:
    return null;
  }
 };

 return (
  <div className="rounded-[10px] text-[#b3b3b3] bg-[#121212] h-full overflow-hidden flex flex-col">
   <LibraryHeader
    category={category}
    setCategory={setCategory}
    libraryScrollPosition={libraryScrollPosition}
   />
   {renderItems()}
  </div>
 );
};

export default Library;
